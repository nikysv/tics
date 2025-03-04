import React from "react";

const PDFViewer = ({ pageSrc, pageNumber, totalPages }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={pageSrc} // Usamos la URL base64 de la página actual
        alt={`Página ${pageNumber}`}
        className="max-w-full h-96 border"
      />
      <p className="mt-2 text-gray-600">
        Página {pageNumber} de {totalPages}
      </p>
    </div>
  );
};

export default PDFViewer;
