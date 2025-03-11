import React, { useState, useEffect } from "react";

const FormularioNacimiento = ({ onGuardar, datosIniciales }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    fechaNacimiento: "",
    sexo: "",
    lugarNacimiento: "",
    ciudadNacimiento: "",
    curp: "",
    nombrePadre: "",
    nombreMadre: "",
  });

  useEffect(() => {
    if (datosIniciales) {
      console.log("Inicializando formulario con datos:", datosIniciales);
      setFormData({
        nombre: datosIniciales.nombre || "",
        apellidoPaterno: datosIniciales.apellido_paterno || "",
        apellidoMaterno: datosIniciales.apellido_materno || "",
        fechaNacimiento: datosIniciales.fecha_nacimiento || "",
        sexo: datosIniciales.sexo || "",
        lugarNacimiento: datosIniciales.lugar_nacimiento || "",
        ciudadNacimiento: datosIniciales.ciudad_nacimiento || "",
        curp: datosIniciales.curp || "",
        nombrePadre: datosIniciales.nombre_padre || "",
        nombreMadre: datosIniciales.nombre_madre || "",
      });
    }
  }, [datosIniciales]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div>
          <label
            htmlFor="apellidoPaterno"
            className="block text-sm font-medium text-gray-700"
          >
            Apellido Paterno
          </label>
          <input
            id="apellidoPaterno"
            name="apellidoPaterno"
            type="text"
            value={formData.apellidoPaterno}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div>
          <label
            htmlFor="apellidoMaterno"
            className="block text-sm font-medium text-gray-700"
          >
            Apellido Materno
          </label>
          <input
            id="apellidoMaterno"
            name="apellidoMaterno"
            type="text"
            value={formData.apellidoMaterno}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div>
          <label
            htmlFor="fechaNacimiento"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de Nacimiento
          </label>
          <input
            id="fechaNacimiento"
            name="fechaNacimiento"
            type="date"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div>
          <label
            htmlFor="sexo"
            className="block text-sm font-medium text-gray-700"
          >
            Sexo
          </label>
          <select
            id="sexo"
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">Seleccione</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="ciudadNacimiento"
            className="block text-sm font-medium text-gray-700"
          >
            Ciudad y Estado de Nacimiento
          </label>
          <input
            id="ciudadNacimiento"
            name="ciudadNacimiento"
            type="text"
            value={formData.ciudadNacimiento}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div>
          <label
            htmlFor="curp"
            className="block text-sm font-medium text-gray-700"
          >
            CURP (Opcional)
          </label>
          <input
            id="curp"
            name="curp"
            type="text"
            value={formData.curp}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div>
          <label
            htmlFor="nombrePadre"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre del Padre
          </label>
          <input
            id="nombrePadre"
            name="nombrePadre"
            type="text"
            value={formData.nombrePadre}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div>
          <label
            htmlFor="nombreMadre"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre de la Madre
          </label>
          <input
            id="nombreMadre"
            name="nombreMadre"
            type="text"
            value={formData.nombreMadre}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Guardar
      </button>
    </form>
  );
};

export default FormularioNacimiento;
