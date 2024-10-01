import React, { useState } from 'react';
import './chatbot.css';
import { Pie, Bar, Line, Radar, Doughnut, PolarArea, Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, LineElement, RadialLinearScale, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// Register the necessary components for charts
ChartJS.register(ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, RadialLinearScale,ChartDataLabels);

function Chatbot() {
  const [messages, setMessages] = useState([
    { text: 'Hi there, how can I help you?', sender: 'ai' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] }); // State for chart data
  const [chartType, setChartType] = useState('pie'); // State for chart type

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return; // Do not send empty messages
    const ack = document.getElementById('ack');
    ack.style.display = 'none';

    setMessages(prevMessages => [...prevMessages, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');
    
    setIsTyping(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chart-data/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      const labels = data.slice(0, -1).map(row => row.col1);
      const values = data.slice(0, -1).map(row => row.col2);

      const colors = labels.map(() => `hsl(${Math.random() * 360}, 70%, 70%)`);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Data Distribution',
            data: values,
            backgroundColor: colors,
            borderColor: colors.map(color => `hsl(${parseInt(color.slice(4, color.indexOf(',')))}, 100%, 30%)`),
            borderWidth: 1,
          },
        ],
      });

      displayTypingEffect(data[data.length - 1].insights);
    } catch (error) {
      displayTypingEffect('Error fetching response from backend.');
    }
  };


    const handleAddToDashboard = async () => {
    const chartElement = document.getElementById('chart-container'); // Get the chart canvas element
    const imageData = chartElement.toDataURL('image/png'); // Convert chart to base64 image
    const latestResponse = messages[messages.length - 1].text; // Get the latest chatbot response for description
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/save-chart-to-dashboard/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: latestResponse,
          image: imageData
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Chart added to dashboard successfully!');
      } else {
        alert('Failed to add chart to dashboard: ' + result.error);
      }
    } catch (error) {
      alert('Error adding chart to dashboard: ' + error.message);
    }
  };


  const displayTypingEffect = (message) => {
    let index = -2;
    const typingSpeed = 50;
  
    if (!isTyping) {
      setMessages(prevMessages => [...prevMessages, { text: '', sender: 'ai' }]);
      setIsTyping(true);
    }
  
    const interval = setInterval(() => {
      setMessages(prevMessages => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        
        if (index < message.length - 1) {
          const updatedMessage = lastMessage.text + message[index + 1];
          return [...prevMessages.slice(0, -1), { text: updatedMessage, sender: 'ai' }];
        } else {
          clearInterval(interval);
          setIsTyping(false);
          return prevMessages;
        }
      });
  
      index++;
    }, typingSpeed);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label + ': ' + context.raw;
          },
        },
      },
      datalabels: {
        display: chartType === 'pie' || chartType === 'doughnut' || chartType === 'polarArea', // Show labels only for pie chart
        color: '#fff',
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}: ${value}`;
        },
        anchor: 'center',
        align: 'center',
      },
    },
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleDownloadChart = () => {
    const chartElement = document.getElementById('chart-container');
    const url = chartElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chart.png';
    link.click();
  };

  const renderChart = () => {
    if (chartType === 'pie') {
      return <Pie id='chart-container' style={{ width: '600px', height: '400px' }} data={chartData} options={chartOptions} />;
    } else if (chartType === 'bar') {
      return <Bar id='chart-container' style={{ width: '600px', height: '400px' }} data={chartData} options={chartOptions} />;
    } else if (chartType === 'line') {
      return <Line id='chart-container' style={{ width: '600px', height: '400px' }} data={chartData} options={chartOptions} />;
    } else if (chartType === 'radar') {
      return <Radar id='chart-container' style={{ width: '600px', height: '400px' }} data={chartData} options={chartOptions} />;
    } else if (chartType === 'doughnut') {
      return <Doughnut id='chart-container' style={{ width: '600px', height: '400px' }} data={chartData} options={chartOptions} />;
    } else if (chartType === 'polarArea') {
      return <PolarArea id='chart-container' style={{ width: '600px', height: '400px' }} data={chartData} options={chartOptions} />;
    } else if (chartType === 'bubble') {
      return <Bubble id='chart-container' style={{ width: '600px', height: '400px' }} data={chartData} options={chartOptions} />;
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {/* Profile Header */}
        <div className="chat-profile-header">
          <span className="chat-profile-pic">P</span>
          <span className="chat-username">Prasath JR</span>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
            >
              <div className="message-container">
                <img
                  src={message.sender === 'user' ? '/user1.png' : '/AI.png'}
                  alt={message.sender}
                  className="message-icon"
                />
                <div className="message-text">{message.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="chat">
          <input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message here..."
            className="chat-input"
          />
          <button onClick={handleSendMessage} className="send-button">
            <span>➣</span>
          </button>
        </div>
      </div>

      <div className='chart-view'>
        <h2 id='ack'>Your Charts Appear Here</h2>

        <select onChange={handleChartTypeChange} value={chartType} className="chart-type-dropdown">
          <option value="pie">Pie Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="radar">Radar Chart</option>
          <option value="doughnut">Doughnut Chart</option>
          <option value="polarArea">Polar Area Chart</option>
          <option value="bubble">Bubble Chart</option>
        </select>

        <div className='chart-inner'>
          {renderChart()}
        </div>

        <center>
          <button onClick={handleDownloadChart} className="download-button">Download Chart</button>
          <button onClick={handleAddToDashboard} className="download-button">Add to Dashboard</button>
        </center>
      </div>
    </div>
  );
}

export default Chatbot;
