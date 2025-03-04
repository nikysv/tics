import React, { useState, useEffect } from "react";
import { usePDFProcessor } from "../hooks/usePDFProcessor";
import PDFUpload from "../components/pdfs/PDFUpload";
import PDFPreview from "../components/pdfs/PDFPreview";
import DocumentsTable from "../components/pdfs/DocumentsTable";

const Indexar = () => {
  const { pdfPages, isLoading, extraerPaginasPDF } = usePDFProcessor();
  const [title, setTitle] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    setUploadedFiles(storedFiles);
  }, []);

  const handleSave = () => {
    if (!title.trim()) {
      alert("Debe ingresar un título.");
      return;
    }
    if (pdfPages.length === 0) {
      alert("Espere a que el PDF se procese antes de guardar.");
      return;
    }

    const newEntry = { title, files: pdfPages };
    const updatedFiles = [...uploadedFiles, newEntry];

    setUploadedFiles(updatedFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
    setTitle("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Subir Documento PDF para Indexar
      </h2>
      <PDFUpload onUpload={extraerPaginasPDF} isLoading={isLoading} />
      {isLoading && (
        <p className="text-blue-500 text-center">
          Procesando PDF, por favor espera...
        </p>
      )}
      <PDFPreview pdfPages={pdfPages} />

      <div className="mb-4">
        <label className="block font-medium text-gray-700">
          Título del Documento
        </label>
        <input
          type="text"
          className="mt-2 w-full p-2 border rounded-lg"
          placeholder="Ingrese un título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <button
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={handleSave}
        disabled={isLoading}
      >
        Guardar Documento
      </button>

      <DocumentsTable documents={uploadedFiles} />
    </div>
  );
};

export default Indexar;
