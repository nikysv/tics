import React, { useState } from "react";
import SeleccionTipoDocumento from "../visor/VisorDocumentos";


const IndexarImagenes = ({ documento, onClose }) => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [indexar, setIndexar] = useState({});
  const [fase, setFase] = useState("marcar"); // Fases: "marcar" o "tipoDocumento"

  const handleIndexar = (index, valor) => {
    setIndexar({ ...indexar, [index]: valor });
  };

  return (
    <div className="p-6">
      {fase === "marcar" ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Imagen {paginaActual + 1} de {documento.files.length}</h2>

          {/* Imagen Preview */}
          <div className="flex justify-center">
            <img src={documento.files[paginaActual]} alt={`Página ${paginaActual + 1}`} className="max-w-full h-96 border" />
          </div>

          {/* Opción de Indexar */}
          <div className="mt-4">
            <label className="block font-medium text-gray-700">¿Se debe indexar esta imagen?</label>
            <select
              className="w-full p-2 border rounded-lg mt-2"
              value={indexar[paginaActual] || "Sí"}
              onChange={(e) => handleIndexar(paginaActual, e.target.value)}
            >
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Navegación entre páginas */}
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded-lg"
              disabled={paginaActual === 0}
              onClick={() => setPaginaActual(paginaActual - 1)}
            >
              Anterior
            </button>
            {paginaActual < documento.files.length - 1 ? (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => setPaginaActual(paginaActual + 1)}
              >
                Siguiente
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={() => setFase("tipoDocumento")}
              >
                Continuar
              </button>
            )}
          </div>
        </>
      ) : (
        <SeleccionTipoDocumento onSeleccionarTipo={(tipo) => console.log("Seleccionó:", tipo)} />
      )}

      {/* Botón para Volver */}
      <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700" onClick={onClose}>
        Volver
      </button>
    </div>
  );
};

export default IndexarImagenes;
