import React from "react";

const PDFUpload = ({ onUpload, isLoading }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Por favor, sube un archivo PDF válido.");
      return;
    }
    onUpload(file);
  };

  return (
    <div className="mb-4">
      <label className="block font-medium text-gray-700">Subir un PDF</label>
      <input
        type="file"
        accept="application/pdf"
        className="mt-2 w-full p-2 border rounded-lg"
        onChange={handleFileChange}
        disabled={isLoading}
      />
    </div>
  );
};

export default PDFUpload;
