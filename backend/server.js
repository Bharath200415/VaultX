require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileRoutes = require("./routes/files");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/files", fileRoutes);

app.get("/", (req, res) => {
  res.json({ message: "VaultX API is running!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});