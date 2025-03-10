import React from "react";
import { useNavigate } from "react-router-dom";

const DocumentsTable = ({ documents, onSelect, isIndexarView }) => {
  const navigate = useNavigate();

  if (documents.length === 0) return <p>No hay documentos disponibles.</p>;

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 p-2">Título</th>
          <th className="border border-gray-300 p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((doc) => (
          <tr key={doc.id} className="text-center">
            <td className="border border-gray-300 p-2 align-middle">
              {doc.titulo}
            </td>
            <td className="border border-gray-300 p-2 align-middle">
              {isIndexarView ? (
                <button
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  onClick={() =>
                    navigate(
                      `/indexar/documento/${encodeURIComponent(doc.titulo)}`
                    )
                  }
                >
                  Ver Documento
                </button>
              ) : (
                onSelect && (
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    onClick={() => onSelect(doc)} // Llamar a la función pasada como prop
                  >
                    Seleccionar
                  </button>
                )
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DocumentsTable;
