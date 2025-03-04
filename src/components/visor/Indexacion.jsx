import React, { useState } from "react";
import VisorDocumentos from "./VisorDocumentos";
import SeleccionTipoDocumento from "./SeleccionTipoDocumento";

const Indexacion = () => {
  const [fase, setFase] = useState("visor"); // "visor" o "tipo"
  const [tipoDocumento, setTipoDocumento] = useState("");

  const archivosEjemplo = [
    "https://via.placeholder.com/300x400?text=Pagina+1",
    "https://via.placeholder.com/300x400?text=Pagina+2",
    "https://via.placeholder.com/300x400?text=Pagina+3",
    "https://via.placeholder.com/300x400?text=Pagina+4",
  ];
  return (
    <div className="p-6 flex flex-col gap-4">
      {fase === "visor" ? (
        <VisorDocumentos
          archivos={archivosEjemplo}
          onContinuar={() => setFase("tipo")}
        />
      ) : (
        <SeleccionTipoDocumento onSeleccionarTipo={setTipoDocumento} />
      )}
    </div>
  );
};

export default Indexacion;
