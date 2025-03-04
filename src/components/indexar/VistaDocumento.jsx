import React, { useState } from "react";

const VistaDocumento = ({ documento, onClose }) => {
  const [paginaActual, setPaginaActual] = useState(0);

  if (!documento) {
    return <p>No hay documento seleccionado.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{documento.title}</h2>

      {/* Vista del documento */}
      <div className="flex justify-center">
        <img
          src={URL.createObjectURL(documento.files[paginaActual])}
          alt={`Página ${paginaActual + 1}`}
          className="max-w-full h-96 border"
        />
      </div>

      {/* Navegación entre páginas */}
      {documento.files.length > 1 && (
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            disabled={paginaActual === 0}
            onClick={() => setPaginaActual(paginaActual - 1)}
          >
            Anterior
          </button>
          <span>Página {paginaActual + 1} de {documento.files.length}</span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={paginaActual === documento.files.length - 1}
            onClick={() => setPaginaActual(paginaActual + 1)}
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Botón para volver */}
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
        onClick={onClose}
      >
        Volver
      </button>
    </div>
  );
};

export default VistaDocumento;
