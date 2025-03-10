import React, { useState } from "react";
import BuscarDocumentoModal from "../components/lotes/BuscarDocumentoModal";
import { useLotes } from "../hooks/useLotes";
import { useNavigate } from "react-router-dom";

const Lotes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { lotes } = useLotes(); // Hook para obtener documentos seleccionados
  const navigate = useNavigate();

  const handleIndexar = (documento) => {
    navigate(`/indexar/${documento.id}`); // Redirige a la vista de indexación
  };
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mis Lotes - Documentos para Indexar</h2>
      <button
        className="mb-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setIsModalOpen(true)}
      >
        Buscar Documento
      </button>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Usuario</th>
            <th className="border border-gray-300 p-2">Título</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lotes.length > 0 ? (
            lotes.map((documento, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 p-2">{documento.nombre}</td>
                <td className="border border-gray-300 p-2">{documento.titulo}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                    onClick={() => handleIndexar(documento)}
                  >
                    Indexar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center p-4">
                No hay documentos seleccionados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <BuscarDocumentoModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Lotes;
