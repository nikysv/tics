import React, { useState } from "react";
import VisorDocumentos from "./VisorDocumentos";
import SeleccionTipoDocumento from "./SeleccionTipoDocumento";

const Indexacion = ({ documento }) => {
  const [fase, setFase] = useState("visor"); // "visor" o "tipo"
  const [paginasSeleccionadas, setPaginasSeleccionadas] = useState([]);

  const handlePaginasSeleccionadas = (paginas) => {
    setPaginasSeleccionadas(paginas);
    setFase("tipo");
  };

  const handleTipoSeleccionado = (tipoData) => {
    // Aquí se manejaría la lógica final de indexación
    console.log("Páginas seleccionadas:", paginasSeleccionadas);
    console.log("Tipo y datos:", tipoData);
  };

  return (
    <div className="p-4">
      {fase === "visor" ? (
        <VisorDocumentos
          documento={documento}
          onPaginasSeleccionadas={handlePaginasSeleccionadas}
        />
      ) : (
        <SeleccionTipoDocumento onSeleccionarTipo={handleTipoSeleccionado} />
      )}
    </div>
  );
};

export default Indexacion;
