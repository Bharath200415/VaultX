import { useRef, useState } from "react";
import { uploadFile } from "../api/files";

export default function UploadButton({ onUploadSuccess }) {
  const inputRef = useRef();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setProgress(0);

    try {
      await uploadFile(formData, setProgress);
      setUploading(false);
      setProgress(0);
      onUploadSuccess();
    } catch (err) {
      alert("Upload failed: " + err.message);
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        onClick={() => inputRef.current.click()}
        disabled={uploading}
        className="bg-gray-800 hover:bg-gray-900 disabled:bg-indigo-400 text-neutral-50 font-semibold px-4 py-2 rounded-xl transition-colors duration-200 cursor-pointer"
      >
        {uploading ? `Uploading... ${progress}%` : "+ Upload File"}
      </button>
      {uploading && (
        <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}