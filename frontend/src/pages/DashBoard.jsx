import { useEffect, useState } from "react";
import { listFiles } from "../api/files";
import FileCard from "../components/FileCard";
import UploadButton from "../components/UploadButton";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await listFiles();
        console.log("Files from API:", res.data);
      setFiles(res.data);
    } catch (err) {
      alert("Failed to fetch files: " + err.message);
    }
    setLoading(false);
  };

  useEffect(() => { fetchFiles(); }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Files</h1>
          <p className="text-sm text-gray-400 mt-1">{files.length} file{files.length !== 1 ? "s" : ""} stored</p>
        </div>
        <UploadButton onUploadSuccess={fetchFiles} />
      </div>

      {/* File List */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">☁️</p>
          <p className="text-gray-500 font-medium">No files yet</p>
          <p className="text-gray-400 text-sm mt-1">Upload your first file to get started</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {files.map((file) => (
            <FileCard key={file.key} file={file} onDelete={fetchFiles} />
          ))}
        </div>
      )}
    </div>
  );
}