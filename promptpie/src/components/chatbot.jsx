import React, { useState } from 'react';
import './chatbot.css';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register the necessary components for charts
ChartJS.register(ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend);

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

  const textInsidePiePlugin = {
    id: 'textInsidePie',
    afterDraw: (chart) => {
      const { ctx, chartArea: { width, height } } = chart;
      chart.data.datasets.forEach((dataset, i) => {
        chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
          const { x, y } = datapoint.tooltipPosition();
          const label = chart.data.labels[index];
          const value = dataset.data[index];
          
          // Draw label
          ctx.font = '14px Arial';
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`${label}`, x, y - 10);
          
          // Draw value
          ctx.font = 'bold 14px Arial';
          ctx.fillText(`${value}`, x, y + 10);
        });
      });
    },
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return; // Do not send empty messages 
    const ack = document.getElementById('ack');
    ack.style.display = 'none';

    // Append the user's message to the messages list
    setMessages(prevMessages => [...prevMessages, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');
    
    setIsTyping(true);

    // Make the API call to the backend
    try {
      const response = await fetch('http://127.0.0.1:8000/api/chart-data/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      console.log(data);

      // Transform data for the chart
      const labels = data.slice(0, -1).map(row => row.col1);
      const values = data.slice(0, -1).map(row => row.col2);

      // Generate unique colors for each segment
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

  const displayTypingEffect = (message) => {
    let index = -2;
    const typingSpeed = 50; // Adjust typing speed here
  
    // Add a new empty message for the AI response if not already typing
    if (!isTyping) {
      setMessages(prevMessages => [...prevMessages, { text: '', sender: 'ai' }]);
      setIsTyping(true);
    }
  
    const interval = setInterval(() => {
      setMessages(prevMessages => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        
        if (index < message.length - 1) {
          // Update the last AI message with the next character
          const updatedMessage = lastMessage.text + message[index + 1];
          return [...prevMessages.slice(0, -1), { text: updatedMessage, sender: 'ai' }];
        } else {
          // Clear the typing effect once the full message is displayed
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
      event.preventDefault(); // Prevents the default behavior of the Enter key
      handleSendMessage();
    }
  };

  const pieChartOptions = {
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
      textInsidePie: true, // Enable custom plugin
    },
  };

  const barChartOptions = {
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
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineChartOptions = {
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
    },
    scales: {
      y: {
        beginAtZero: true,  // Ensure y-axis starts at zero
      },
      x: {
        beginAtZero: true,  // Optional: Ensure x-axis starts at zero (usually for category-based data)
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
      return <Pie id='chart-container' style={{ width: '600px', height: '400px' }} data={chartData} options={pieChartOptions} plugins={[textInsidePiePlugin]} />;
    } else if (chartType === 'bar') {
      return <Bar id='chart-container' style={{ width: '600px', height: '400px' }} data={chartData} options={barChartOptions} />;
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {/* Profile Header Inside the Chat Box */}
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

        {/* Chat Input Area */}
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
        </select>

        <div className='chart-inner'>
          {renderChart()}
        </div>

        <center><button onClick={handleDownloadChart} className="download-button">Download Chart</button> <button className="download-button">Add to Dashboard</button></center>
      </div>
    </div>
  );
}

export default Chatbot;
