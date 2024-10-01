import React, { useEffect, useState } from 'react';
import './profile.css';
import profileimg from '../Images/Ellipse1.png';
import downloadIcon from '../Images/Vector.png';

const Profile = () => {
    const [pdf_files, setPDFfiles] = useState([]);

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

    return (
        <div className='Profilepage'>
            <div className='profile-background'>
                <div className="profile-picture">
                    <img src={profileimg} alt="Profile" />
                    <div className="profileName">Anonymous</div>
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
