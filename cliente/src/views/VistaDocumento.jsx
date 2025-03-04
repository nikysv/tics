import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PDFViewer from "../components/pdfs/PDFViewer";
import PDFNavigation from "../components/pdfs/PDFNavigation";

const VistaDocumento = () => {
  const { titulo } = useParams();
  const navigate = useNavigate();
  const [documento, setDocumento] = useState(null);
  const [paginaActual, setPaginaActual] = useState(0);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    const foundDoc = storedFiles.find(
      (doc) => doc.title === decodeURIComponent(titulo)
    );

    if (foundDoc) {
      setDocumento(foundDoc);
    } else {
      navigate("/indexar"); // Redirigir si el documento no existe
    }
  }, [titulo, navigate]);

  if (!documento) return <p>No hay documento seleccionado.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{documento.title}</h2>
      <PDFViewer
        pageSrc={documento.files[paginaActual]}
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
