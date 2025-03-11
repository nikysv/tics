import { useState, useEffect } from "react";

export const useDocument = (docId) => {
  const [documento, setDocumento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocumento = async () => {
      if (!docId) {
        console.log("No docId provided");
        setError("ID de documento no proporcionado");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const token = sessionStorage.getItem("token");
        console.log(`Fetching documento with ID: ${docId}`);

        const res = await fetch(
          `http://localhost:5000/documents/documento/id/${docId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        console.log("Response data:", data);

        if (!res.ok) {
          throw new Error(data.error || "Error al cargar el documento");
        }

        setDocumento(data);
      } catch (err) {
        console.error("Error fetching document:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumento();
  }, [docId]);

  return { documento, loading, error };
};
