import React, { useState } from "react";
import IndexarImagenes from "./IndexarImagenes";

const MisLotes = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Documento de prueba (puedes cambiarlo por tus propias rutas)
  const documentoEjemplo = {
    title: "Documento de Prueba",
    files: [
      "https://via.placeholder.com/300x400?text=Pagina+1",
      "https://via.placeholder.com/300x400?text=Pagina+2",
      "https://via.placeholder.com/300x400?text=Pagina+3"
    ]
  };

  return (
    <div className="p-6">
      {selectedDocument ? (
        <IndexarImagenes documento={selectedDocument} onClose={() => setSelectedDocument(null)} />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Mis Lotes - Documentos para Indexar</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Título</th>
                <th className="border border-gray-300 p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="border border-gray-300 p-2">{documentoEjemplo.title}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    onClick={() => setSelectedDocument(documentoEjemplo)}
                  >
                    Indexar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MisLotes;
