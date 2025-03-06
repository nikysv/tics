import React from "react";

const PDFPreview = ({ pdfUrl }) => {
  if (!pdfUrl) return null; // 🛠️ No mostrar nada si no hay un PDF seleccionado

  return (
    <div className="mb-4 p-4 border rounded-lg bg-gray-100">
      <h3 className="font-semibold">Vista Previa del PDF:</h3>
      <iframe
        src={pdfUrl}
        title="Vista Previa del PDF"
        className="w-full h-96 border"
      />
    </div>
  );
};

export default PDFPreview;