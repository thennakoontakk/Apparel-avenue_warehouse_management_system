import React from "react";
import "./style.css";

function Footer() {
  return (
    <footer className="text-center mt-5 footer-shadow">
      <p>&copy; 2024 Apparel Avenue. All rights reserved.</p>
      <div>
        <a href="/contact-us" className="mr-3">
          Contact Us
        </a>
        <a href="/about-us">About Us</a>
      </div>
    </footer>
  );
}

export default Footer;
