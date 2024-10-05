import React from "react";

const Footer = () => {
  return (
    <div style={footerContainerStyle}>
      {/* Logo and copyright */}
      <div style={footerTopStyle}>
        <div style={logoSectionStyle}>
          <img
            src="images/logowhite.png"
            alt="Ravel Logo"
            style={logoStyle}
          />
        </div>

        {/* Sections: Resources, Follow Us, Legal */}
        <div style={footerSectionsStyle}>
          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>RESOURCES</h4>
            <a href="#about" style={linkStyle}>About Us</a>
            <a href="#contact" style={linkStyle}>Contact Us</a>
          </div>
          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>FOLLOW US</h4>
            <a href="https://facebook.com" style={linkStyle}>Facebook</a>
            <a href="https://instagram.com" style={linkStyle}>Instagram</a>
          </div>
          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>LEGAL</h4>
            <a href="#refund" style={linkStyle}>Refund Policy</a>
            <a href="#privacy" style={linkStyle}>Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Copyright and Social Icons */}
      <div style={footerBottomStyle}>
        <span style={copyrightStyle}>
          © 2024 RAVEL CLOTHING. All Rights Reserved.
        </span>
        <div style={socialIconsStyle}>
          <i className="fab fa-facebook" style={iconStyle}></i>
          <i className="fab fa-instagram" style={iconStyle}></i>
        </div>
      </div>
    </div>
  );
};

// Inline CSS
const footerContainerStyle = {
  backgroundColor: "#003366", // Dark blue background
  color: "white",
  padding: "20px 50px",
};

const footerTopStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "20px",
};

const logoSectionStyle = {
  display: "flex",
  alignItems: "center",
};

const logoStyle = {
  height: "40px",
  marginRight: "10px",
};

const brandNameStyle = {
  fontSize: "24px",
  fontWeight: "bold",
};

const footerSectionsStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "60%", 
};

const sectionStyle = {
  display: "flex",
  flexDirection: "column",
};

const sectionTitleStyle = {
  fontSize: "18px",
  marginBottom: "10px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  marginBottom: "8px",
  fontSize: "16px",
};

linkStyle[':hover'] = {
  textDecoration: "underline",
};

const footerBottomStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderTop: "1px solid white",
  paddingTop: "10px",
};

const copyrightStyle = {
  fontSize: "14px",
};

const socialIconsStyle = {
  display: "flex",
  gap: "15px",
};

const iconStyle = {
  fontSize: "24px",
  cursor: "pointer",
};

export default Footer;
