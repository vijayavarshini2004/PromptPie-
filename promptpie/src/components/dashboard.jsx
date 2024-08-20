import './dashboard.css'

export default function Dashboard(){
    return (
        <div className='dash-body'>
        <div className="dash-navbar">
            <div className='search'><input type="text" placeholder='Search' /><img className='search-img' src='https://www.thinkafrica.fi/wp-content/uploads/2019/04/search-icon.png'></img></div>
            <div className='right'>
                <span className='profile'>P</span>
                <span className='settings'><img src='https://icons.veryicon.com/png/o/miscellaneous/acdm-monochromatic/fy_ic_setting.png'/></span>
            </div>
        </div>
        <div className='dash-main'>
            <h2>Analytics Overview</h2>
            <p>Database ID : 29JFH98RHF</p>
            <br />
            <div className='analytics-stats'>
                
                <div>
                    <div><img src="https://cdn2.iconfinder.com/data/icons/admin-panel-flat/2048/Subscribers-512.png" alt="" /></div>
                    <div>22.5k</div>
                    <div>Total Followers</div>
                </div>
                <div>
                    <div><img src="https://www.seekpng.com/png/detail/145-1457681_question-mark-png-question-mark-hover-icon.png" alt="" /></div>
                    <div>18k</div>
                    <div>Impressions</div>
                </div>
                <div>
                    <div><img src="https://th.bing.com/th/id/OIP.W0upvwjEmSvT5oZlV_-L2AHaHa?rs=1&pid=ImgDetMain" alt="" /></div>
                    <div>30k</div>
                    <div>Reaches</div>
                </div>
                <div>
                    <div><img src="https://static.vecteezy.com/system/resources/previews/013/707/711/original/eps10-blue-palm-hand-abstract-solid-art-icon-isolated-on-white-background-stop-or-no-hand-filled-symbol-in-a-simple-flat-trendy-modern-style-for-your-website-design-logo-and-mobile-app-vector.jpg" alt="" /></div>
                    <div>12.5k</div>
                    <div>Engagement rate</div>
                </div>
            </div>

            <div className='dash-bottom'>
              <div className='dash-charts'>
                <div><img src="https://th.bing.com/th/id/R.cf4230eab9e1103ab7e5d7d6f64572b5?rik=tZ03GGSAJ3dJOg&riu=http%3a%2f%2fcdn.embed.ly%2fproviders%2flogos%2fstrawpoll.png&ehk=TKvMgdp9vhotQbIKRgYSyP48sc1pvwtmanGp8MgdarI%3d&risl=&pid=ImgRaw&r=0" alt="" /></div>
                <div><img src="https://www.weather2visit.com/images/charts/small/ihuo-ng-mar-pre.png" alt="" /></div>
                <div><img src="https://user-images.githubusercontent.com/62892813/135819792-d0e9ec07-a48b-4758-b9d1-147e8a3a615f.png" alt="" /></div>
                <div><img src="https://cdn1.byjus.com/wp-content/uploads/2019/08/scatter-plot.png" alt="" /></div>
                <div><img src="https://www.mdpi.com/sustainability/sustainability-13-11054/article_deploy/html/images/sustainability-13-11054-g003.png" alt="" /></div>
                <div><img src="https://th.bing.com/th/id/OIP.7CU5ZHHFD-m_xBiye1q5JQHaFj?rs=1&pid=ImgDetMain" alt="" /></div>
              </div>  

              <div className='dash-buttons'>
                <div>Resources</div>
                <div>Analyse</div>
                <div>Chat</div>
              </div>
            </div>
            
        </div>
        
        </div>
        
    )
}


