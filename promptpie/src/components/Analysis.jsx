import React, { useState, useEffect } from 'react';
import './analysis.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Navigate } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = {
  BLOCK: 'contentBlock',
};

const DraggableContentBlock = ({ data, index, moveBlock, className }) => {
  const [, ref] = useDrag({
    type: ItemType.BLOCK,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType.BLOCK,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveBlock(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className={className}>
      <div className="image-block">
        <img src={data.base64Image} alt="Chart" />
      </div>
      <div className="text-block">
        <p>{data.description}</p>
      </div>
    </div>
  );
};

const MyAnalysis = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [analysisData, setAnalysisData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get-charts/');
        const data = await response.json();

        if (data.charts && Array.isArray(data.charts)) {
          const chartsWithBase64Images = await Promise.all(
            data.charts.map(async (chart) => {
              const imgResponse = await fetch(`http://localhost:8000${chart.image}`, { mode: 'cors' });
              const blob = await imgResponse.blob();
              const base64Image = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              });

              return { ...chart, base64Image };
            })
          );

          setAnalysisData(chartsWithBase64Images);
        } else {
          setError('Invalid data format. Expected an array under "charts".');
        }
      } catch (error) {
        console.error('Error fetching analysis data:', error);
        setError('Error fetching data from the server.');
      }
    };

    fetchAnalysisData();
  }, []);

  const moveBlock = (fromIndex, toIndex) => {
    const updatedData = [...analysisData];
    const [movedBlock] = updatedData.splice(fromIndex, 1);
    updatedData.splice(toIndex, 0, movedBlock);
    setAnalysisData(updatedData);
  };

  const handleDownload = () => {
    const input = document.querySelector('.content-section');

    const images = input.querySelectorAll('img');
    const promises = Array.from(images).map((img) => {
      return new Promise((resolve, reject) => {
        if (img.complete) resolve();
        else {
          img.onload = resolve;
          img.onerror = reject;
        }
      });
    });

    Promise.all(promises)
      .then(() => html2canvas(input))
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        const filename = inputTitle.trim() !== '' ? `${inputTitle}.pdf` : 'analysis.pdf';
        pdf.save(filename);

        const pdfBlob = pdf.output('blob');
        const formData = new FormData();
        formData.append('name', inputTitle.trim() || 'Untitled PDF');
        formData.append('file', pdfBlob, filename);

        fetch('http://localhost:8000/api/upload/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => console.log('PDF successfully uploaded:', data))
          .catch((error) => console.error('Error uploading PDF:', error));
      })
      .catch((error) => console.error('Error generating PDF:', error));
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  const token = localStorage.getItem('access_token');
  if (!token) return <Navigate to="/login" />;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="analysis-container">
        <div className="analysis-header">
          <h2>YOUR ANALYSIS</h2>
        </div>
        <div className="input-section">
          <label htmlFor="inputTitle">Enter a title: </label>
          <input
            type="text"
            id="inputTitle"
            placeholder="Enter your title here....."
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />
        </div>
        <div className="content-section">
          {analysisData.length > 0 ? (
            analysisData.map((data, index) => (
              <DraggableContentBlock
                key={index}
                data={data}
                index={index}
                moveBlock={moveBlock}
                className={`content-block ${index % 2 === 0 ? 'content-left-image' : 'content-right-image'}`}
              />
            ))
          ) : (
            <p>No data available.</p>
          )}
        </div>
        <div className="download-section">
          <button className="download-button" onClick={handleDownload}>
            DOWNLOAD
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default MyAnalysis;
