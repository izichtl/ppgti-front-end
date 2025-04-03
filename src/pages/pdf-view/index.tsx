import React, { useState } from 'react';

// TODO
// PRECISA AJUSTAR O IMPORT CORRETO DA URL
// PRECISA PASSAR A URL VIA PROP
// PRECISA CONSTRUIR/REVISAR A ESTRUTURA
const PDFViewer: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const token = localStorage.getItem('token'); // Pegue o token salvo

  const fetchPDF = async () => {
    try {
      const response = await fetch(
        'http://localhost:2711/api/v1/file-manager/pdf/11065994702_sh_formulario_pontuacao_eh_DECLARACAO_IF.pdf',
        {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token
          },
        }
      );

      if (!response.ok) throw new Error('Acesso negado');

      const pdfBlob = await response.blob();
      const pdfObjectURL = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfObjectURL);
    } catch (error) {
      console.error(error);
      alert('Você não tem permissão para acessar este PDF.');
    }
  };

  return (
    <div>
      <h2>Visualizar PDF</h2>
      <button onClick={fetchPDF}>Carregar PDF</button>
      {pdfUrl && <iframe src={pdfUrl} width='100%' height='600px' />}
    </div>
  );
};

export default PDFViewer;
