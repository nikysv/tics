import { useState, useEffect, useCallback } from "react";

export const useLotes = () => {
  const [lotes, setLotes] = useState([]);
  const [documents, setDocuments] = useState([]);
  const token = sessionStorage.getItem("token");

  // Función auxiliar para hacer peticiones
  const fetchData = useCallback(async (url, setState) => {
    if (!token) return;
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error en la petición");
      const data = await res.json();
      setState(data);
    } catch (error) {
      console.error(`Error al obtener datos de ${url}:`, error);
    }
  }, [token]);
  // Fetch de lotes
  const fetchLotes = useCallback(() => {
    fetchData("http://localhost:5000/lotes/mislotes", setLotes);
  }, [fetchData]);

  // Fetch de documentos no seleccionados
  const fetchUnselectedDocuments = useCallback(() => {
    fetchData("http://localhost:5000/lotes/no-seleccionados", setDocuments);
  }, [fetchData]);

  // useEffect para inicializar la data solo cuando se monta el componente
  useEffect(() => {
    fetchLotes();
    fetchUnselectedDocuments();
  }, [fetchLotes, fetchUnselectedDocuments]);

  return { lotes, documents, fetchLotes, fetchUnselectedDocuments };
};
