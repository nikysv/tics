import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";
import IndexarImagenes from "../components/lotes/IndexarImagenes";

const VistaDocumento = () => {
  const { docId } = useParams(); // Changed from id to docId
  const navigate = useNavigate();
  const { documento, loading, error } = useDocument(docId);

  console.log("ID del documento recibido:", docId);
  console.log("Documento en vista:", documento);

  if (loading)
    return <p className="text-center text-gray-500">Cargando documento...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!documento)
    return (
      <p className="text-center text-red-500">No se encontró el documento.</p>
    );

  return (
    <div className="p-6">
      <div className="mb-4">
        <button
          onClick={() => navigate("/lotes")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          ← Volver
        </button>
      </div>
      <IndexarImagenes documento={documento} />
    </div>
  );
};

export default VistaDocumento;
