import React, { useState } from "react";

const Inicio = () => {
  // Simulación de bitácora de acciones del usuario
  const [bitacora, setBitacora] = useState([
    { fecha: "2024-03-03 14:30", accion: "Subió un documento (Acta_001.pdf)" },
    { fecha: "2024-03-03 14:45", accion: "Indexó 5 registros" },
    { fecha: "2024-03-04 10:00", accion: "Descargó un lote indexado" },
  ]);

  return (
    <div className="p-6 flex gap-6">
      {/* Sección de Totales de Indexación */}
      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-4">Mis totales de indexación</h2>
        <div className="border p-4 rounded-lg shadow-md bg-white w-full">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="bg-orange-300 text-white p-2 rounded">📝</span>
              <span className="font-medium">Indexación</span>
            </div>
            <span className="font-bold">0</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center">
            <span className="font-medium">Total de registros</span>
            <span className="font-bold">0</span>
          </div>
        </div>
      </div>

      {/* Sección de Bitácora de Actividades */}
      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-4">Bitácora de Actividades</h2>
        <div className="border p-4 rounded-lg shadow-md bg-white w-full h-60 overflow-y-auto">
          {bitacora.length > 0 ? (
            <ul className="space-y-2">
              {bitacora.map((item, index) => (
                <li key={index} className="text-sm border-b py-2">
                  <span className="font-semibold">{item.fecha}:</span> {item.accion}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No hay actividades registradas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inicio;
