import { useState, useEffect } from "react";

export const useDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/documents/documentos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDocuments(data);
    } catch (error) {
      console.error("Error al obtener documentos:", error);
    }
  };

  return { documents, fetchDocuments };
};
