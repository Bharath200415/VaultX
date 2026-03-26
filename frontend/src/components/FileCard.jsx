import { downloadFile, shareFile, deleteFile } from "../api/files";

export default function FileCard({ file, onDelete }) {

  const handleDownload = async () => {
    console.log("File object:", file);        
    console.log("File key:", file.key);    
    const res = await downloadFile(file.key);
    window.open(res.data.url, "_blank");
  };

  const handleShare = async () => {
    console.log("File object:", file);        
    console.log("File key:", file.key); 
    const res = await shareFile(file.key);
    await navigator.clipboard.writeText(res.data.url);
    alert("Share link copied! Valid for 24 hours.");
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${file.name}?`)) return;
    await deleteFile(file.key);
    onDelete();
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = (name) => {
    const ext = name.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "🖼️";
    if (["mp4", "mov", "avi"].includes(ext)) return "🎬";
    if (["mp3", "wav"].includes(ext)) return "🎵";
    if (["zip", "rar"].includes(ext)) return "🗜️";
    if (ext === "pdf") return "📕";
    if (["doc", "docx"].includes(ext)) return "📝";
    return "📄";
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <span className="text-3xl">{getFileIcon(file.name)}</span>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 truncate">{file.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {formatSize(file.size)} · {new Date(file.lastModified).toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleDownload}
          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium text-sm px-3 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer"
        >
          ⬇ Download
        </button>
        <button
          onClick={handleShare}
          className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-medium text-sm px-3 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer"
        >
          🔗 Share
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-50 hover:bg-red-100 text-red-500 font-medium text-sm px-3 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}