import { useEffect, useState } from 'react';
import './dashboard.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Sidebar from './sidebar';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
    const [charts, setCharts] = useState([]);
    const [sideOpen, setSideOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false); // New state for logging out

    const handleLogout = () => {
        localStorage.removeItem('access_token'); // Clear the token from localStorage
        setIsAuthenticated(false); // Update the authentication state
        setIsLoggingOut(true); // Update state to indicate logging out
      };



    // Fetch saved charts from the backend
    useEffect(() => {
        const fetchCharts = async () => {

            try {
                const response = await fetch('http://127.0.0.1:8000/api/get-charts/');
                const data = await response.json();
                setCharts(data.charts); // Update state with fetched charts
            } catch (error) {
                console.error('Error fetching charts:', error);
            }
        };

        fetchCharts();
    }, []);

    const token = localStorage.getItem('access_token');

    if (!token) {
        return <Navigate to="/login" />; // Redirect to login if not authenticated
    }

    const handleSideBar = (event) => {
        setSideOpen(!sideOpen)
    }

    if (isLoggingOut) {
        return <Navigate to="/login" />; // Redirect to login when logging out
    }

    return (
        
        <div className='dash-body'>
            {sideOpen ? ( 
            <div className="sidebar-container">
            <button onClick={handleSideBar} >X</button>
            <br />
            <ul>
                <li><Link className='sideItem' to={'/'}>Home</Link></li>
                <hr />
                <li><Link to={'/about'} className="sideItem">About us</Link></li>
                <hr />
                <li><Link to={'/contact'} className="sideItem">Contact us</Link></li>
                <hr />
                <li><Link to={'/faqs'} className="sideItem">FAQs</Link></li>
                <hr />
                <li>Language</li>
                <hr />
                <li onClick={handleLogout}><Link to={'/Signup'} className="sideItem">Logout</Link></li>
            </ul>
            </div>
            ) : <div></div>}


            <div className="dash-navbar">
                <div className='search'>
                    <input type="text" placeholder='Search' />
                    <img className='search-img' src='https://www.thinkafrica.fi/wp-content/uploads/2019/04/search-icon.png' alt='search'/>
                </div>
                <div className='right'>
                    <span className='profile'>P</span>
                    <span className='settings' id='settings' onClick={handleSideBar}>
                        <img src='https://icons.veryicon.com/png/o/miscellaneous/acdm-monochromatic/fy_ic_setting.png' alt='settings'/>
                    </span>
                </div>
            </div>


            <div className='dash-main'>
                <h2>Analytics Overview</h2>
                <p>Database ID : 29JFH98RHF</p>
                <br />
                <div className='analytics-stats'>
                    <div>
                        <div><img src="https://cdn2.iconfinder.com/data/icons/admin-panel-flat/2048/Subscribers-512.png" alt="Total Followers" /></div>
                        <div>22.5k</div>
                        <div>Total Followers</div>
                    </div>
                    <div>
                        <div><img src="https://www.seekpng.com/png/detail/145-1457681_question-mark-png-question-mark-hover-icon.png" alt="Impressions" /></div>
                        <div>18k</div>
                        <div>Impressions</div>
                    </div>
                    <div>
                        <div><img src="https://th.bing.com/th/id/OIP.W0upvwjEmSvT5oZlV_-L2AHaHa?rs=1&pid=ImgDetMain" alt="Reaches" /></div>
                        <div>30k</div>
                        <div>Reaches</div>
                    </div>
                    <div>
                        <div><img src="https://static.vecteezy.com/system/resources/previews/013/707/711/original/eps10-blue-palm-hand-abstract-solid-art-icon-isolated-on-white-background-stop-or-no-hand-filled-symbol-in-a-simple-flat-trendy-modern-style-for-your-website-design-logo-and-mobile-app-vector.jpg" alt="Engagement rate" /></div>
                        <div>12.5k</div>
                        <div>Engagement rate</div>
                    </div>
                </div>

                <div className='dash-bottom'>
                    <div className='dash-charts'>
                        {charts.map((chart, index) => (
                            <div key={index}>
                                <img src={`http://localhost:8000${chart.image}`} alt={chart.description} />
                            </div>
                        ))}
                    </div>  

                    <div className='dash-buttons'>
                        <Link to="/Profile" style={{ textDecoration: 'none' }}>
                            <div>Resources</div>
                        </Link>
                        <Link to="/Analysis" style={{ textDecoration: 'none' }}> 
                            <div>Analyse</div>
                        </Link>
                        <Link to="/chat" style={{ textDecoration: 'none' }}>
                            <div>Chat</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
