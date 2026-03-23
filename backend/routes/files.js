const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} = require("@aws-sdk/client-s3");
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET = process.env.S3_BUCKET_NAME;
const upload = multer({ storage: multer.memoryStorage() });

//file upload 
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const key = `uploads/${Date.now()}-${file.originalname}`;

    await s3.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));

    res.json({ message: "File uploaded successfully!", key });
  } catch (err) {
    res.status(500).json({error: err.message });
  }
});

//Listing all the files from the bucket
router.get("/", async (req, res) => {
  try {
    const data = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET }));
    const files = (data.Contents || []).map((f) => ({
      key: f.Key,
      size: f.Size,
      lastModified: f.LastModified,
      name: f.Key.split("/").pop(),
    }));
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Download feature
router.get("/download/:key(*)", async (req, res) => {
  try {
    const url = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: BUCKET,
        Key: req.params.key,
        ResponseContentDisposition: `attachment; filename="${req.params.key.split("/").pop()}"`,
      }),
      { expiresIn: 3600 }
    );
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Share file (aws signed url ke thru)
router.get("/share/:key(*)", async (req, res) => {
  try {
    const url = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: BUCKET,
        Key: req.params.key,
      }),
      { expiresIn: 86400 } //24 hours
    );
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//File deletion
router.delete("/:key(*)", async (req, res) => {
  try {
    await s3.send(new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: req.params.key,
    }));
    res.json({ message: "File deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;