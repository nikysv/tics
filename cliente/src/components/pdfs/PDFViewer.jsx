import React from "react";

const PDFViewer = ({ pageSrc, pageNumber, totalPages }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={pageSrc}
        alt={`Página ${pageNumber}`}
        className="max-w-full h-[80vh] border shadow-lg"
      />
      <p className="mt-2 text-gray-600">
        Página {pageNumber} de {totalPages}
      </p>
    </div>
  );
};

export default PDFViewer;
