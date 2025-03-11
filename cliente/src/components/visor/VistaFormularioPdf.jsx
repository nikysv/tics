import React, { useState, useEffect } from "react";
import FormularioNacimiento from "./FormularioNacimiento";
import FormularioMatrimonio from "./FormularioMatrimonio";

const VistaFormularioPdf = ({
  documento,
  paginasAIndexar,
  tipo,
  onGuardar,
}) => {
  const [datosExistentes, setDatosExistentes] = useState(null);
  const [paginaActual, setPaginaActual] = useState(0);

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
          if (datos && datos.campos && datos.campos[paginaActual + 1]) {
            // Transformar los datos al formato del formulario
            const datosFormateados = {
              nombre: datos.campos[paginaActual + 1].nombre || "",
              apellido_paterno:
                datos.campos[paginaActual + 1].apellido_paterno || "",
              apellido_materno:
                datos.campos[paginaActual + 1].apellido_materno || "",
              // ... y así con todos los campos
            };
            setDatosExistentes(datosFormateados);
            console.log("Datos cargados para formulario:", datosFormateados);
          }
        }
      } catch (error) {
        console.error("Error cargando datos existentes:", error);
      }
    };

    cargarDatosExistentes();
  }, [documento.id, paginaActual]);

  // Filtrar solo las páginas que se van a indexar
  const paginasIndexables = documento.files.filter(
    (_, index) => paginasAIndexar[index] === "si"
  );

  const handleGuardarFormulario = (valores) => {
    console.log("Valores originales del formulario:", valores);

    // Mapeo completo de campos para nacimiento y matrimonio
    const camposMapping = {
      nombre: "nombre",
      apellidoPaterno: "apellido_paterno",
      apellidoMaterno: "apellido_materno",
      fechaNacimiento: "fecha_nacimiento",
      sexo: "sexo",
      lugarNacimiento: "lugar_nacimiento",
      ciudadNacimiento: "ciudad_nacimiento",
      curp: "curp",
      nombrePadre: "nombre_padre",
      nombreMadre: "nombre_madre",
      // Campos de matrimonio
      nombreConyuge1: "nombre_conyuge1",
      apellidoPaternoConyuge1: "apellido_paterno_conyuge1",
      apellidoMaternoConyuge1: "apellido_materno_conyuge1",
      edadConyuge1: "edad_conyuge1",
      nombreConyuge2: "nombre_conyuge2",
      apellidoPaternoConyuge2: "apellido_paterno_conyuge2",
      apellidoMaternoConyuge2: "apellido_materno_conyuge2",
      edadConyuge2: "edad_conyuge2",
      fechaMatrimonio: "fecha_matrimonio",
      lugarMatrimonio: "lugar_matrimonio",
      municipioMatrimonio: "municipio_matrimonio",
      estadoMatrimonio: "estado_matrimonio",
      nombrePadreConyuge1: "nombre_padre_conyuge1",
      nombreMadreConyuge1: "nombre_madre_conyuge1",
      nombrePadreConyuge2: "nombre_padre_conyuge2",
      nombreMadreConyuge2: "nombre_madre_conyuge2",
      regimenMatrimonial: "regimen_matrimonial",
    };

    // Crear objeto con los nombres de campos correctos
    const datosIndexacion = {};
    Object.keys(valores).forEach((campoFormulario) => {
      const campoDB = camposMapping[campoFormulario];
      if (campoDB) {
        // Asegurar que incluso los valores vacíos se envíen
        datosIndexacion[campoDB] = valores[campoFormulario] || "";
      }
    });

    console.log("Datos indexación procesados:", datosIndexacion);

    onGuardar({
      tipo_documento: tipo,
      datos: datosIndexacion,
    });
  };

  const renderFormulario = () => {
    if (!paginasIndexables.length) {
      return (
        <div className="text-center text-gray-600">
          No hay páginas seleccionadas para indexar
        </div>
      );
    }

    const props = {
      onGuardar: handleGuardarFormulario,
      datosIniciales: datosExistentes,
      paginaActual,
      esEdicion: !!datosExistentes,
      tipo: tipo,
    };

    return (
      <div>
        {datosExistentes && (
          <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-600">
              Modificando indexación existente
            </p>
          </div>
        )}
        {tipo === "nacimiento" && <FormularioNacimiento {...props} />}
        {tipo === "matrimonio" && <FormularioMatrimonio {...props} />}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      {/* Lado izquierdo: Visor de documento */}
      <div className="border rounded-lg p-4 bg-white">
        <h3 className="text-lg font-semibold mb-4">Documento a Indexar</h3>
        <div className="flex flex-col items-center">
          <img
            src={`http://localhost:5000/documents/${documento.files[paginaActual]}`}
            alt={`Página ${paginaActual + 1}`}
            className="max-w-full h-[60vh] border shadow-lg mb-4"
          />
          <div className="flex gap-4">
            <button
              onClick={() => setPaginaActual((prev) => prev - 1)}
              disabled={paginaActual === 0}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() => setPaginaActual((prev) => prev + 1)}
              disabled={paginaActual === documento.files.length - 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Página {paginaActual + 1} de {documento.files.length}
            {paginasAIndexar[paginaActual] === "si"
              ? " (Seleccionada para indexar)"
              : " (No seleccionada)"}
          </p>
        </div>
      </div>

      {/* Lado derecho: Formulario */}
      <div className="border rounded-lg p-4 bg-white">
        <h3 className="text-lg font-semibold mb-4">Campos de Indexación</h3>
        {renderFormulario()}
        {console.log("Datos pasados al formulario:", datosExistentes)}
      </div>
    </div>
  );
};

export default VistaFormularioPdf;
