import React from 'react'
import './plans.css';



const Plans =()=>
  {
    return(
        <>
        <br />
        <br />
        <br />
        <center><h1>Explore our Tiers</h1></center>
        <div className="pricing-box-container">
            
            <br />
	<div className="pricing-box text-center">
		<h5>Free</h5>
		<p className="price"><sup>$</sup>0<sub>/mo</sub></p>
		<ul className="features-list">
			<li><strong>1</strong> Dashboard</li>
			<li><strong>1</strong> Team Members</li>
			<li><strong>25</strong> Prompts per day</li>
		</ul>
		<button className="btn-primary">Get Started</button>
	</div>

	<div className="pricing-box pricing-box-bg-image text-center">
		<h5>Team</h5>
		<p className="price"><sup>$</sup>39<sub>/mo</sub></p>
		<ul className="features-list">
			<li><strong>5</strong> Project</li>
			<li><strong>20</strong> Team Members</li>
			<li><strong>100</strong> Personal Projects</li>
			<li><strong>15,000</strong> Messages</li>
		</ul>
		<button className="btn-primary">Get Started</button>
	</div>

	<div className="pricing-box text-center">
		<h5>Enterprise</h5>
		<p className="price">Pay as you go</p>
		<ul className="features-list">
			<li><strong>Custom</strong> Dashboards</li>
			<li><strong>30</strong> Team Members</li>
			<li><strong>custom</strong> Prompts per day</li>
		</ul>
		<button className="btn-primary">Get Started</button>
	</div>
</div>
</>
      
    )
}
export default Plans