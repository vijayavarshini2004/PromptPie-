import React, { useState, useEffect } from 'react';
import './analysis.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Navigate } from 'react-router-dom';

const MyAnalysis = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [analysisData, setAnalysisData] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get-charts/');
        const data = await response.json();

        if (data.charts && Array.isArray(data.charts)) {
          const chartsWithBase64Images = await Promise.all(
            data.charts.map(async (chart) => {
              // Fetch the image as a blob and convert it to base64
              const imgResponse = await fetch(`http://localhost:8000${chart.image}`, { mode: 'cors' });
              const blob = await imgResponse.blob();
              const base64Image = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              });

              // Return the chart with base64 image data
              return {
                ...chart,
                base64Image,
              };
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

  const handleDownload = () => {
    const input = document.querySelector('.content-section');
  
    // Ensure images are loaded before generating the PDF
    const images = input.querySelectorAll('img');
    const promises = Array.from(images).map((img) => {
      return new Promise((resolve, reject) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
          img.onerror = reject;
        }
      });
    });
  
    // Wait for all images to load
    Promise.all(promises)
      .then(() => {
        return html2canvas(input);
      })
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
        
        // Save the PDF locally
        pdf.save(filename);
  
        // Send the generated PDF to Django backend for storage
        const pdfBlob = pdf.output('blob');
        const formData = new FormData();
        formData.append('name', inputTitle.trim() || 'Untitled PDF');
        formData.append('file', pdfBlob, filename);
  
        fetch('http://localhost:8000/api/upload/', {
          method: 'POST',
          body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('PDF successfully uploaded:', data);
        })
        .catch((error) => {
          console.error('Error uploading PDF:', error);
        });
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  };

  // Display error message if there's an error
  if (error) {
    return <div className="error">{error}</div>;
  }

  const token = localStorage.getItem('access_token');

  if (!token) {
      return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return (
    <div className="analysis-container">
      <div className="analysis-header">
        <h2>YOUR ANALYSIS</h2>
      </div>
      <div className="input-section">
        <label htmlFor="inputTitle">Input:</label>
        <input
          type="text"
          id="inputTitle"
          placeholder="Enter your title here....."
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
      </div>
      <div className="content-section">
        {/* Render content blocks dynamically */}
        {analysisData.length > 0 ? (
          analysisData.map((data, index) => (
            <div
              key={index}
              className={`content-block ${index % 2 === 0 ? 'content-left-image' : 'content-right-image'}`}
            >
              <div className="image-block">
                <img src={data.base64Image} alt="Chart" />
              </div>
              <div className="text-block">
                <p>{data.description}</p>
              </div>
            </div>
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
  );
};

export default MyAnalysis;
