import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4><b>United States</b></h4>
      </div>

      <div className="midFooter">
        <h1>Etsy.Inc</h1>
        <p>customers are our assets</p>
        <p>Copyrights 2022 &copy; RakshithBollu</p>
      </div>

      <div className="rightFooter">
        <h4>Contact Us</h4>
        <p>etsy@customerservice.in</p>
        <p>+1234567890</p>
      </div>
    </footer>
  );
};

export default Footer;