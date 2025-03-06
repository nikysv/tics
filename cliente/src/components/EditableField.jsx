import React, { useState } from "react";

const EditableField = ({ label, value, onSave, type = "text" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleSave = () => {
    if (!newValue.trim()) return; // Evitar guardar valores vacíos
    onSave(newValue);
    setIsEditing(false);
  };

  return (
    <div className="mb-4">
      <label className="block font-medium text-gray-700">{label}</label>
      {isEditing ? (
        <div className="flex gap-2">
          <input
            type={type}
            className="w-full p-2 border rounded-lg"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600" onClick={handleSave}>
            Guardar
          </button>
          <button className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500" onClick={() => setIsEditing(false)}>
            Cancelar
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p>{value}</p>
          <button className="text-blue-500 hover:underline" onClick={() => setIsEditing(true)}>
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableField;
