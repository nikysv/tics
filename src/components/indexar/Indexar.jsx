import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Configurar el worker usando una URL absoluta
const workerUrl = "/node_modules/pdfjs-dist/build/pdf.worker.min.js";
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

const Indexar = ({ onOpenDocument }) => {
  const [pdfPages, setPdfPages] = useState([]);
  const [title, setTitle] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Por favor, sube un archivo PDF válido.");
      return;
    }

    setIsLoading(true);
    setPdfPages([]);
    const pages = await extraerPaginasPDF(file);
    setPdfPages(pages);
    setIsLoading(false);
  };

  const extraerPaginasPDF = async (file) => {
    const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
    let paginas = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;
      paginas.push(canvas.toDataURL("image/png"));
    }

    return paginas;
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert("Debe ingresar un título.");
      return;
    }
    if (pdfPages.length === 0) {
      alert("Espere a que el PDF se procese antes de guardar.");
      return;
    }

    const newEntry = {
      title,
      files: pdfPages,
    };

    setUploadedFiles([...uploadedFiles, newEntry]);
    setTitle("");
    setPdfPages([]);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Subir Documento PDF para Indexar
      </h2>

      {/* Subida de Archivos */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Subir un PDF</label>
        <input
          type="file"
          accept="application/pdf"
          className="mt-2 w-full p-2 border rounded-lg"
          onChange={handleFileUpload}
          disabled={isLoading}
        />
      </div>

      {/* Mensaje de Carga */}
      {isLoading && (
        <p className="text-blue-500 text-center">
          Procesando PDF, por favor espera...
        </p>
      )}

      {/* Vista Previa */}
      {pdfPages.length > 0 && (
        <div className="mb-4 p-4 border rounded-lg bg-gray-100">
          <h3 className="font-semibold">
            Vista Previa (Páginas extraídas del PDF):
          </h3>
          <div className="flex gap-2 overflow-x-auto">
            {pdfPages.map((page, index) => (
              <div
                key={index}
                className="w-24 h-32 border rounded flex items-center justify-center bg-white"
              >
                <img
                  src={page}
                  alt={`Página ${index + 1}`}
                  className="max-w-full max-h-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Título del Documento */}
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

      {/* Botón Guardar */}
      <button
        className={`w-full py-2 rounded-lg ${
          isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading ? "Procesando..." : "Guardar Documento"}
      </button>

      {/* Tabla de Documentos Subidos */}
      {uploadedFiles.length > 0 && (
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
              {uploadedFiles.map((doc, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{doc.title}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                      onClick={() => onOpenDocument(doc)}
                    >
                      Ver Documento
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Indexar;
