import React, { useState } from 'react';
import './analysis.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Analysisimg1 from '../Images/Analysis-img1.png';
import Analysisimg2 from '../Images/Analysis-img2.png';
import Analysisimg3 from '../Images/Analysis-img3.png';
import Analysisimg4 from '../Images/Analysis-img4.png';
import Analysisimg5 from '../Images/Analysis-img5.png';
import Analysisimg6 from '../Images/Analysis-img6.png';

const MyAnalysis = () => {
  const [inputTitle, setInputTitle] = useState('');

  const handleDownload = () => {
    const input = document.querySelector('.content-section');
    html2canvas(input).then((canvas) => {
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

      // Set the filename to the user input or a default name if input is empty
      const filename = inputTitle.trim() !== '' ? `${inputTitle}.pdf` : 'analysis.pdf';
      pdf.save(filename);
    })
    .catch((error) => {
      console.error('Error generating PDF:', error);
    });
  };

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
        {/* Content blocks */}
        <div className="content-block content-left-image">
          <div className="image-block">
            <img src={Analysisimg1} alt="Pie Chart" />
          </div>
          <div className="text-block">
            <h2>Pie Chart Analysis</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </p>
          </div>
        </div>
        <div className="content-block content-right-image">
          <div className="image-block">
            <img src={Analysisimg2} alt="Bar Chart" />
          </div>
          <div className="text-block">
            <h2>Bar Chart Analysis</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </p>
          </div>
        </div>
        <div className="content-block content-left-image">
          <div className="image-block">
            <img src={Analysisimg3} alt="Scatter Plot" />
          </div>
          <div className="text-block">
            <h2>Scatter Plot Analysis</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </p>
          </div>
        </div>
        <div className="content-block content-right-image">
          <div className="image-block">
            <img src={Analysisimg4} alt="Bar Chart 2" />
          </div>
          <div className="text-block">
            <h2>Another Bar Chart Analysis</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </p>
          </div>
        </div>

        <div className="content-block content-left-image">
          <div className="image-block">
            <img src={Analysisimg5} alt="Line Chart" />
          </div>
          <div className="text-block">
            <h2>Line Chart Analysis</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </p>
          </div>
        </div>

        <div className="content-block content-right-image">
          <div className="image-block">
            <img src={Analysisimg6} alt="Distribution Chart" />
          </div>
          <div className="text-block">
            <h2>Distribution Chart Analysis</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </p>
          </div>
        </div>
      </div>
      <div className="download-section">
        <button className="download-button" onClick={handleDownload}>DOWNLOAD</button>
      </div>
    </div>
  );
};

export default MyAnalysis;
