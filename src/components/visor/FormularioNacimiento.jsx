import React, { useState } from "react";

const FormularioNacimiento = ({ onGuardar }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    fechaNacimiento: "",
    sexo: "",
    ciudadNacimiento: "",
    curp: "",
    nombrePadre: "",
    nombreMadre: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(formData);
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Datos del Acta de Nacimiento</h2>
      <form onSubmit={handleSubmit}>

        {/* Nombre Completo */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Nombre *</label>
          <input type="text" name="nombre" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium text-gray-700">Apellido Paterno *</label>
            <input type="text" name="apellidoPaterno" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Apellido Materno</label>
            <input type="text" name="apellidoMaterno" className="w-full p-2 border rounded-lg" onChange={handleChange} />
          </div>
        </div>

        {/* Fecha de Nacimiento y Sexo */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium text-gray-700">Fecha de Nacimiento *</label>
            <input type="date" name="fechaNacimiento" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Sexo *</label>
            <select name="sexo" className="w-full p-2 border rounded-lg" onChange={handleChange} required>
              <option value="">Seleccione</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        </div>

        {/* Ciudad de Nacimiento */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Ciudad y Estado de Nacimiento *</label>
          <input type="text" name="ciudadNacimiento" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
        </div>

        {/* CURP (Opcional) */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">CURP (Opcional)</label>
          <input type="text" name="curp" className="w-full p-2 border rounded-lg" onChange={handleChange} />
        </div>

        {/* Nombre de los Padres */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium text-gray-700">Nombre del Padre</label>
            <input type="text" name="nombrePadre" className="w-full p-2 border rounded-lg" onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Nombre de la Madre</label>
            <input type="text" name="nombreMadre" className="w-full p-2 border rounded-lg" onChange={handleChange} />
          </div>
        </div>

        {/* Botón Guardar */}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Guardar Datos
        </button>

      </form>
    </div>
  );
};

export default FormularioNacimiento;
