import React from "react";
import { useNavigate } from "react-router-dom";

const DocumentsTable = ({ documents }) => {
  const navigate = useNavigate(); // Hook de navegación sin refresco

  if (documents.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-2">Documentos Subidos</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Título</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 p-2">{doc.title}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  onClick={() => navigate(`/indexar/documento/${encodeURIComponent(doc.title)}`)}
                >
                  Ver Documento
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentsTable;
