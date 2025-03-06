import React, { useState, useEffect } from "react";
import { usePDFProcessor } from "../hooks/usePDFProcessor";
import PDFUpload from "../components/pdfs/PDFUpload";
import PDFPreview from "../components/pdfs/PDFPreview";
import DocumentsTable from "../components/pdfs/DocumentsTable";

const Indexar = () => {
  const { isLoading } = usePDFProcessor();
  const [title, setTitle] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(""); // 🛠️ Almacena la URL del PDF

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/documentos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUploadedFiles(data);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    
    // 🛠️ Generar una URL temporal para mostrar la vista previa
    const previewUrl = URL.createObjectURL(file);
    setPdfPreviewUrl(previewUrl);
  };

  const handleSave = async () => {

    if (!selectedFile) {
      alert("Debe subir un archivo antes de guardar.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", selectedFile);

    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }, // 🔹 No añadir `Content-Type`, Fetch lo maneja
      body: formData,
    });

    if (res.ok) {
      alert("Documento guardado correctamente");
      setTitle("");
      setSelectedFile(null);
      setPdfPreviewUrl("");
      fetchDocuments();
    } else {
      alert("Error al guardar el documento");
    }
};


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Subir Documento PDF para Indexar
      </h2>
      <PDFUpload onUpload={handleFileSelect} isLoading={isLoading} />
      <PDFPreview pdfUrl={pdfPreviewUrl} /> {/* 🛠️ Pasamos la URL del PDF */}
      
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
