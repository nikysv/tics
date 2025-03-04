import React from "react";

const PDFNavigation = ({ currentPage, totalPages, onPrevious, onNext }) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        disabled={currentPage === 0}
        onClick={onPrevious}
      >
        Anterior
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        disabled={currentPage === totalPages - 1}
        onClick={onNext}
      >
        Siguiente
      </button>
    </div>
  );
};

export default PDFNavigation;
