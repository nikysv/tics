import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VisorDocumentos from "../visor/VisorDocumentos";
import FormularioNacimiento from "../visor/FormularioNacimiento";
import FormularioMatrimonio from "../visor/FormularioMatrimonio";
import VistaFormularioPdf from "../visor/VistaFormularioPdf";

const IndexarImagenes = ({ documento }) => {
  const [fase, setFase] = useState("seleccion");
  const [paginasAIndexar, setPaginasAIndexar] = useState({});
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [datosIndexados, setDatosIndexados] = useState(null);
  const navigate = useNavigate();
  const [datosFormulario, setDatosFormulario] = useState({});

  useEffect(() => {
    const cargarDatosExistentes = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/documents/documento/${documento.id}/indexacion`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.ok) {
          const datos = await response.json();
          console.log("Datos recibidos:", datos);

          if (datos && datos.tipo_documento) {
            setTipoSeleccionado(datos.tipo_documento);
            setDatosIndexados(datos);

            // Verificar que datos.campos existe antes de usar Object.keys
            if (datos.campos) {
              const paginasIndexadas = {};
              // Convertir los números de página a índices base 0
              Object.keys(datos.campos).forEach((numPag) => {
                paginasIndexadas[parseInt(numPag) - 1] = "si";
              });
              setPaginasAIndexar(paginasIndexadas);
              setFase("tipo");
            }
          }
        }
      } catch (error) {
        console.error("Error cargando datos existentes:", error);
      }
    };

    if (documento && documento.id) {
      cargarDatosExistentes();
    }
  }, [documento]);

  const handlePaginasSeleccionadas = (paginas) => {
    setPaginasAIndexar(paginas);
    setFase("tipo");
  };

  const handleTipoSeleccionado = async (tipoData) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/documents/documento/indexar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            documento_id: documento.id,
            tipo_documento: tipoData.tipo,
            datos_indexacion: tipoData.datos,
            paginas_indexar: paginasAIndexar,
          }),
        }
      );

      if (response.ok) {
        alert("Documento indexado correctamente");
        navigate("/lotes");
      } else {
        const error = await response.json();
        alert(error.error || "Error al guardar la indexación");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  const handleTipoDocumentoChange = (e) => {
    setTipoSeleccionado(e.target.value);
  };

  const handleGuardarFormulario = async (datos) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("No hay sesión activa. Por favor inicie sesión nuevamente.");
        navigate("/login");
        return;
      }

      console.log("Enviando datos:", {
        documento_id: documento.id,
        tipo_documento: tipoSeleccionado,
        datos_indexacion: datos.datos, // Get the processed data
        paginas_indexar: paginasAIndexar,
      });

      const response = await fetch(
        "http://localhost:5000/documents/documento/indexar",
        {
          // Changed endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            documento_id: documento.id,
            tipo_documento: tipoSeleccionado,
            datos_indexacion: datos.datos,
            paginas_indexar: paginasAIndexar,
          }),
        }
      );

      const responseData = await response.json();
      console.log("Respuesta del servidor:", responseData);

      if (response.ok) {
        alert("Documento indexado correctamente");
        navigate("/lotes");
      } else {
        throw new Error(responseData.error || "Error al guardar la indexación");
      }
    } catch (error) {
      console.error("Error completo:", error);
      alert("Error al guardar la indexación");
    }
  };

  const renderFormulario = () => {
    switch (tipoSeleccionado) {
      case "nacimiento":
        return <FormularioNacimiento onGuardar={handleGuardarFormulario} />;
      case "matrimonio":
        return <FormularioMatrimonio onGuardar={handleGuardarFormulario} />;
      default:
        return null;
    }
  };

  if (fase === "seleccion") {
    return (
      <VisorDocumentos
        documento={documento}
        onPaginasSeleccionadas={handlePaginasSeleccionadas}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 p-4 border rounded-lg bg-white shadow-md">
        <label htmlFor="tipo" className="block font-medium text-gray-700">
          Tipo de documento *
        </label>
        <select
          id="tipo"
          name="tipo"
          className="w-full p-2 border rounded-lg mt-2"
          value={tipoSeleccionado}
          onChange={handleTipoDocumentoChange}
          required
        >
          <option value="">Seleccione una opción</option>
          <option value="nacimiento">Acta de Nacimiento</option>
          <option value="matrimonio">Acta de Matrimonio</option>
        </select>
      </div>

      {tipoSeleccionado && (
        <VistaFormularioPdf
          documento={documento}
          paginasAIndexar={paginasAIndexar}
          tipo={tipoSeleccionado}
          onGuardar={handleGuardarFormulario}
        />
      )}
    </div>
  );
};

export default IndexarImagenes;
