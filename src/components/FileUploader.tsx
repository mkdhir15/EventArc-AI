import { useState } from "react";

const categorize = (name: string) => {
  if (name.includes("invoice")) return "Invoices";
  if (name.includes("certificate")) return "Certificates";
  if (name.includes("report")) return "Reports";
  return "Others";
};

const FileUploader = () => {
  const [files, setFiles] = useState<Record<string, File[]>>({});

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const grouped: Record<string, File[]> = {};

    Array.from(e.target.files).forEach((file) => {
      const category = categorize(file.name.toLowerCase());
      grouped[category] = [...(grouped[category] || []), file];
    });

    setFiles(grouped);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="font-semibold mb-3">Upload Event PDFs</h3>

      <input type="file" multiple accept=".pdf" onChange={handleUpload} />

      {Object.keys(files).map((category) => (
        <div key={category} className="mb-3">
          <h4 className="text-indigo-400 font-medium">
            {category} ({files[category].length})
          </h4>
          <ul className="text-sm text-white/70">
            {files[category].map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FileUploader;
