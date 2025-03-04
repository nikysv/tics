import React, { useState } from "react";

const FormularioMatrimonio = ({ onGuardar }) => {
  const [formData, setFormData] = useState({
    nombreConyuge1: "",
    apellidoPaternoConyuge1: "",
    apellidoMaternoConyuge1: "",
    curpConyuge1: "",
    edadConyuge1: "",

    nombreConyuge2: "",
    apellidoPaternoConyuge2: "",
    apellidoMaternoConyuge2: "",
    curpConyuge2: "",
    edadConyuge2: "",

    fechaMatrimonio: "",
    lugarMatrimonio: "",
    testigo1: "",
    testigo2: "",
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
      <h2 className="text-xl font-bold mb-4">Datos del Acta de Matrimonio</h2>
      <form onSubmit={handleSubmit}>

        {/* Datos del Primer Cónyuge */}
        <h3 className="font-semibold mb-2">Primer Cónyuge</h3>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Nombre *</label>
          <input type="text" name="nombreConyuge1" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium text-gray-700">Apellido Paterno *</label>
            <input type="text" name="apellidoPaternoConyuge1" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Apellido Materno</label>
            <input type="text" name="apellidoMaternoConyuge1" className="w-full p-2 border rounded-lg" onChange={handleChange} />
          </div>
        </div>

        {/* CURP y Edad */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium text-gray-700">CURP (Opcional)</label>
            <input type="text" name="curpConyuge1" className="w-full p-2 border rounded-lg" onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Edad *</label>
            <input type="number" name="edadConyuge1" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
          </div>
        </div>

        {/* Datos del Segundo Cónyuge */}
        <h3 className="font-semibold mb-2 mt-4">Segundo Cónyuge</h3>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Nombre *</label>
          <input type="text" name="nombreConyuge2" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium text-gray-700">Apellido Paterno *</label>
            <input type="text" name="apellidoPaternoConyuge2" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Apellido Materno</label>
            <input type="text" name="apellidoMaternoConyuge2" className="w-full p-2 border rounded-lg" onChange={handleChange} />
          </div>
        </div>

        {/* CURP y Edad */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium text-gray-700">CURP (Opcional)</label>
            <input type="text" name="curpConyuge2" className="w-full p-2 border rounded-lg" onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Edad *</label>
            <input type="number" name="edadConyuge2" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
          </div>
        </div>

        {/* Fecha y Lugar del Matrimonio */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium text-gray-700">Fecha del Matrimonio *</label>
            <input type="date" name="fechaMatrimonio" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Lugar del Matrimonio *</label>
            <input type="text" name="lugarMatrimonio" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
          </div>
        </div>

        {/* Testigos */}
        <h3 className="font-semibold mb-2 mt-4">Testigos</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium text-gray-700">Nombre del Primer Testigo *</label>
            <input type="text" name="testigo1" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Nombre del Segundo Testigo *</label>
            <input type="text" name="testigo2" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
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

export default FormularioMatrimonio;
