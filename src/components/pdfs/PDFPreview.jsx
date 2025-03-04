import React from "react";

const PDFPreview = ({ pdfPages }) => {
  if (pdfPages.length === 0) return null;

  return (
    <div className="mb-4 p-4 border rounded-lg bg-gray-100">
      <h3 className="font-semibold">Vista Previa (Páginas extraídas del PDF):</h3>
      <div className="flex gap-2 overflow-x-auto">
        {pdfPages.map((page, index) => (
          <div key={index} className="w-24 h-32 border rounded flex items-center justify-center bg-white">
            <img src={page} alt={`Página ${index + 1}`} className="max-w-full max-h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFPreview;
