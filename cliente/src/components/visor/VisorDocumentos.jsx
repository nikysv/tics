import React, { useState } from "react";

const VisorDocumentos = ({ documento, onPaginasSeleccionadas }) => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [paginasAIndexar, setPaginasAIndexar] = useState({});

  const handleIndexarDecision = (pageIndex, indexar) => {
    setPaginasAIndexar((prev) => ({
      ...prev,
      [pageIndex]: indexar,
    }));
  };

  const handleContinuar = () => {
    if (
      documento.files.every((_, index) => paginasAIndexar[index] !== undefined)
    ) {
      onPaginasSeleccionadas(paginasAIndexar);
    } else {
      alert("Por favor, decide si indexar o no todas las páginas");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{documento.titulo}</h2>

      {/* Vista de la página actual */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={`http://localhost:5000/documents/${documento.files[paginaActual]}`}
          alt={`Página ${paginaActual + 1} de ${documento.files.length}`}
          className="max-w-full h-[70vh] border shadow-lg mb-4"
        />

        {/* Indicador de página */}
        <p className="text-gray-600 mb-4">
          Página {paginaActual + 1} de {documento.files.length}
        </p>

        {/* Selector para indexar */}
        <div className="w-full max-w-md">
          <label
            htmlFor={`indexar-pagina-${paginaActual}`}
            className="block text-lg font-medium mb-2"
          >
            ¿Indexar esta página?
          </label>
          <select
            id={`indexar-pagina-${paginaActual}`}
            name={`indexar-pagina-${paginaActual}`}
            className="w-full p-2 border rounded"
            value={paginasAIndexar[paginaActual] || ""}
            onChange={(e) =>
              handleIndexarDecision(paginaActual, e.target.value)
            }
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      {/* Navegación */}
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPaginaActual((prev) => prev - 1)}
          disabled={paginaActual === 0}
        >
          Anterior
        </button>

        {paginaActual === documento.files.length - 1 ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleContinuar}
          >
            Continuar
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setPaginaActual((prev) => prev + 1)}
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default VisorDocumentos;
