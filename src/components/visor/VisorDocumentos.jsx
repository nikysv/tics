import React, { useState } from "react";
import FormularioNacimiento from "./FormularioNacimiento";
import VistaFormularioPDF from "./VistaFormularioPdf";

const SeleccionTipoDocumento = () => {
  const [tipo, setTipo] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md w-full">
      {!mostrarFormulario ? (
        <>
          <h2 className="text-xl font-bold mb-4">Seleccionar Tipo de Documento</h2>

          <label className="block font-medium text-gray-700">Tipo de registro *</label>
          <select
            className="w-full p-2 border rounded-lg mt-2"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">Seleccione una opción</option>
            <option value="nacimiento">Acta de Nacimiento</option>
            <option value="matrimonio">Acta de Matrimonio</option>
          </select>

          {/* Botón para continuar */}
          {tipo && (
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
              onClick={() => setMostrarFormulario(true)}
            >
              Continuar
            </button>
          )}
        </>
      ) : (
        <VistaFormularioPDF tipo={tipo} />
      )}
    </div>
  );
};

export default SeleccionTipoDocumento;
