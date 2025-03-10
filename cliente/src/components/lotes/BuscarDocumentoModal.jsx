import React from "react";
import DocumentsTable from "../pdfs/DocumentsTable";
import { useLotes } from "../../hooks/useLotes";

const BuscarDocumentoModal = ({ onClose }) => {
  const { documents } = useLotes() // Hook para obtener documentos disponibles

  const handleSelectDocument = async (document) => {
    const token = sessionStorage.getItem("token"); // Token JWT
    try {
      const response = await fetch("http://localhost:5000/lotes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ document_id: document.id }), // Enviar "document_id"
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message || "Documento añadido al lote exitosamente.");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "No se pudo añadir el documento al lote."}`);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Error al conectar con el servidor.");
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h3 className="text-xl font-bold mb-4">Seleccionar Documento</h3>
        <DocumentsTable documents={documents} onSelect={handleSelectDocument} isIndexarView={false}/>
        <button
          className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default BuscarDocumentoModal;
