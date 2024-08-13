import React from "react";
//import "./ecommercePages/style.css"; // Assuming this contains your footer styles

function Footer() {
  return (
    <footer className="text-center mt-5 footer-shadow fixed-bottom">
      {" "}
      {/* Add fixed-bottom class */}
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
