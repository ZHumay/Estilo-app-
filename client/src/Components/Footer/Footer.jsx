import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer_info-first">
          <div className="logo">
           
          </div>
         
          <p className="text">
          Estilo is one of the largest international fashion companies.
The customer is at the heart of our unique business model, which includes design, production, distribution and sales through our extensive retail network.
          </p>
        </div>
        <div className="footer_info-second">
<h3>Categories</h3>
<ul>
  <li>Woman</li>
  <li>Man</li>

</ul>
        </div>
        <div className="footer_info-third">
        <h3>About us</h3>
<ul>
  <li>About Us</li>
  <li>Press</li>
  <li>Contact Us</li>
  <li>Help Center</li>
  <li>How it Works</li>
  <li>Privacy</li>
  <li>Terms</li>
</ul>
        </div>
        <div className="footer_info-forth">
          <h3>Stay in the loop</h3>
          <p>Join our mailing list to stay in the loop with our newest for Recipes</p>
          <span className="button">
            <input type="email" placeholder="Enter your email address"/>
            <button>Subscibe Now</button>
          </span>
        </div>
      </div>
      <div className="copyright"></div>
    </>
  );
}

export default Footer;
