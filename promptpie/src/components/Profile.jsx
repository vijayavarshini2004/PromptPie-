import React, { useEffect, useState } from 'react';
import './profile.css';
import profileimg from '../Images/Ellipse1.png';
import downloadIcon from '../Images/Vector.png';
import { Navigate } from 'react-router-dom';

const Profile = () => {
    const [pdf_files, setPDFfiles] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/get-username/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                const data = await response.json();
                setUsername(data.username);
            } catch (error) {
                console.error("Error fetching username:", error);
            }
        };
    
        fetchUsername();
        console.log(username)
    }, []);

    // Fetch files from the backend
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/get-files/');
                const data = await response.json();
                setPDFfiles(data.pdf_files); // Assuming the data is an array of file objects
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };
        fetchFiles();
    }, []);

    // Handle file download
    const handleDownload = (fileUrl, fileName) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        link.click();
    };

    const token = localStorage.getItem('access_token');

    if (!token) {
        return <Navigate to="/login" />; // Redirect to login if not authenticated
    }

    return (
        <div className='Profilepage'>
            <div className='profile-background'>
                <div className="profile-picture">
                    <img src='https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png' alt="Profile" />
                    <div className="profileName">{username}</div>
                </div>
            </div>

            <div className="recentActivity">
                Recent Activity
            </div>

            <div className="databaseID">
                Database ID
            </div>

            <div className="rectangleContainer">
                <div className="rectangle">
                    <div className="rectangleText">24ABSU34</div>
                    <div className="rectangleDate">24/08/12</div>
                    <div className="rectangleTime">7:00</div>
                </div>
                {/* Other rectangles */}
            </div>

            <div className="DownloadHistory">
                Download History
            </div>

            <div className="rectangleContainer2">
                {pdf_files.length > 0 ? (
                    pdf_files.map((file, index) => (
                        <div key={index} className="rectangle2">
                            <div className="rectangleText2">{file.fileName}</div>
                            <img
                                src={downloadIcon}
                                alt="Download"
                                className="dow"
                                onClick={() => handleDownload(`http://localhost:8000${file.file}`, file.fileName)}
                            />
                        </div>
                    ))
                ) : (
                    <p>No files available.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
