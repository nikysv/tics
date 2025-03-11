import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";

const VerDocumento = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { documento, loading, error } = useDocument(docId);
  const [datosIndexados, setDatosIndexados] = useState(null);
  const [paginaActual, setPaginaActual] = useState(0);

  useEffect(() => {
    const cargarDatosIndexados = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/documents/documento/${docId}/indexacion`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const datos = await response.json();
          setDatosIndexados(datos);
        }
      } catch (error) {
        console.error("Error cargando indexación:", error);
      }
    };

    if (documento) {
      cargarDatosIndexados();
    }
  }, [docId, documento]);

  const renderDatosIndexados = () => {
    if (!datosIndexados || !datosIndexados.campos) {
      return (
        <p className="text-center text-gray-500">
          No hay datos indexados para este documento
        </p>
      );
    }

    const datosPagina = datosIndexados.campos[paginaActual + 1];

    if (!datosPagina) {
      return (
        <p className="text-center text-gray-500">
          No hay datos indexados para esta página
        </p>
      );
    }

    return (
      <div className="space-y-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Tipo de Documento: {datosIndexados.tipo_documento}
          </h3>
          <p className="text-sm text-blue-600">Página {paginaActual + 1}</p>
        </div>

        {Object.entries(datosPagina).map(([campo, valor], index) => (
          <div key={index} className="border-b pb-2">
            <p className="font-semibold">{campo}</p>
            <p className="text-gray-600">{valor || "No especificado"}</p>
          </div>
        ))}
      </div>
    );
  };

  if (loading)
    return <p className="text-center text-gray-500">Cargando documento...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

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

      <div className="grid grid-cols-2 gap-6">
        {/* Visor de documento */}
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-xl font-bold mb-4">{documento.titulo}</h2>
          <div className="flex flex-col items-center">
            <img
              src={`http://localhost:5000/documents/${documento.files[paginaActual]}`}
              alt={`Página ${paginaActual + 1}`}
              className="max-w-full h-[70vh] border shadow-lg mb-4"
            />
            <div className="flex gap-4 my-4">
              <button
                onClick={() => setPaginaActual((p) => p - 1)}
                disabled={paginaActual === 0}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setPaginaActual((p) => p + 1)}
                disabled={paginaActual === documento.files.length - 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
            <p>
              Página {paginaActual + 1} de {documento.files.length}
            </p>
          </div>
        </div>

        {/* Datos indexados */}
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-xl font-bold mb-4">Datos Indexados</h2>
          {renderDatosIndexados()}
        </div>
      </div>
    </div>
  );
};

export default VerDocumento;
