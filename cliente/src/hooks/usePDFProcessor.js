import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

const pdfWorker = "/node_modules/pdfjs-dist/build/pdf.worker.min.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const usePDFProcessor = () => {
  const [pdfPages, setPdfPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const extraerPaginasPDF = async (file) => {
    setIsLoading(true);
    setPdfPages([]);
    
    try {
      
      const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
      let paginas = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;
        paginas.push(canvas.toDataURL("image/png"));
      }

      setPdfPages(paginas);
    } catch (error) {
      console.error("Error al procesar PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { pdfPages, isLoading, extraerPaginasPDF };
};
