import React, { useState } from "react";
import FormularioNacimiento from "./FormularioNacimiento";
import FormularioMatrimonio from "./FormularioMatrimonio";

const VistaFormularioPDF = ({ tipo }) => {
  const [paginaActual, setPaginaActual] = useState(0);
  const pdfEjemplo = [
    "https://via.placeholder.com/500x700?text=Pagina+1",
    "https://via.placeholder.com/500x700?text=Pagina+2",
  ]; // Reemplaza con el PDF real

  return (
    <div className="flex gap-6 p-6">
      {/* Formulario */}
      <div className="w-1/2 border p-4 rounded-lg bg-white shadow-md">
        {tipo === "nacimiento" && <FormularioNacimiento />}
        {tipo === "matrimonio" && <FormularioMatrimonio />}
      </div>

      {/* Vista del PDF */}
      <div className="w-1/2 flex flex-col items-center border p-4 rounded-lg bg-white shadow-md">
        <h2 className="text-xl font-bold mb-4">Imagen {paginaActual + 1} de {pdfEjemplo.length}</h2>
        <img src={pdfEjemplo[paginaActual]} alt={`Página ${paginaActual + 1}`} className="w-full h-auto border" />

        {/* Botones de navegación */}
        <div className="flex justify-between w-full mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            disabled={paginaActual === 0}
            onClick={() => setPaginaActual(paginaActual - 1)}
          >
            Anterior
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={paginaActual === pdfEjemplo.length - 1}
            onClick={() => setPaginaActual(paginaActual + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default VistaFormularioPDF;
