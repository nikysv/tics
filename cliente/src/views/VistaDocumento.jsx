import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";
import PDFViewer from "../components/pdfs/PDFViewer";
import PDFNavigation from "../components/pdfs/PDFNavigation";

const VistaDocumento = () => {
  const { titulo } = useParams();
  const navigate = useNavigate();
  const { documento, loading, error } = useDocument(titulo);
  const [paginaActual, setPaginaActual] = useState(0);

  if (loading) return <p className="text-center text-gray-500">Cargando documento...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!documento) return <p className="text-center text-red-500">No se encontró el documento.</p>;

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">{documento.titulo}</h2>

      <PDFViewer
        pageSrc={`http://localhost:5000/documents/${documento.files[paginaActual]}`} // ✅ Manteniendo la estructura
        pageNumber={paginaActual + 1}
        totalPages={documento.files.length}
      />

      {documento.files.length > 1 && (
        <PDFNavigation
          currentPage={paginaActual}
          totalPages={documento.files.length}
          onPrevious={() => setPaginaActual(paginaActual - 1)}
          onNext={() => setPaginaActual(paginaActual + 1)}
        />
      )}

      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
        onClick={() => navigate("/indexar")}
      >
        Volver
      </button>
    </div>
  );
};

export default VistaDocumento;
