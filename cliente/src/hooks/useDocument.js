import { useState, useEffect } from "react";

export const useDocument = (titulo) => {
  const [documento, setDocumento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocumento = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/documents/documento/${encodeURIComponent(titulo)}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Documento no encontrado");

        const data = await res.json();
        setDocumento(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumento();
  }, [titulo]);

  return { documento, loading, error };
};
