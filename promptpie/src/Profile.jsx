import React from 'react'
import './profile.css';
import profileimg from './Images/Ellipse 1.png';
import downloadIcon from './Images/Vector.png';

const Profile = () => {
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
                <div className="rectangle">
                    <div className="rectangleText">17TGDC89</div>
                    <div className="rectangleDate">24/08/01</div>
                    <div className="rectangleTime">15:00</div>
                </div>
                <div className="rectangle">
                    <div className="rectangleText">90RGWV56</div>
                    <div className="rectangleDate">24/07/28</div>
                    <div className="rectangleTime">19:30</div>
                </div>
                <div className="rectangle">
                    <div className="rectangleText">93UNDR78</div>
                    <div className="rectangleDate">24/07/15</div>
                    <div className="rectangleTime">15:42</div>
                </div>
                <div className="rectangle">
                    <div className="rectangleText">73LFIN90</div>
                    <div className="rectangleDate">24/07/07</div>
                    <div className="rectangleTime">11:50</div>
                </div>
            </div>
            <div className="DownloadHistory">
                    Download History
            </div>
            <div className="rectangleContainer2">
                <div className="rectangle2">
                    <div className="rectangleText2">STOCKMARKET.pdf</div>
                    <img src={downloadIcon} alt="Download" className="dow" />
                </div>
                <div className="rectangle2">
                    <div className="rectangleText2">ATTENDANCE.docx</div>
                    <img src={downloadIcon} alt="Download" className="dow" />
                </div>
                <div className="rectangle2">
                    <div className="rectangleText2">CORONA19EFF.pdf</div>
                    <img src={downloadIcon} alt="Download" className="dow" />
                </div>
            </div>
            
        </div>
    )
}
 export default Profile