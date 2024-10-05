import React from "react";

const Header = () => {
  return (
    <div style={headerContainerStyle}>
      {/* Logo section */}
      <div style={logoSectionStyle}>
        <img src="images/logowhite.png" alt="Ravel Logo" style={logoStyle} />
      </div>

      {/* Navigation section */}
      <div style={navLinksStyle}>
        <a
          href="#home"
          style={navItemStyle}
          onClick={() => {
            window.location.href = "http://localhost:5173";
          }}
        >
          HOME
        </a>

        <a href="#3dmodel" style={navItemStyle}>
          3D MODEL
        </a>
        <a
          href="#home"
          style={navItemStyle}
          onClick={() => {
            window.location.href = "http://localhost:5173/clothes/customize";
          }}
        >
          CUSTOMIZE
        </a>
      </div>

      {/* Icons section */}
      <div style={iconsSectionStyle}>
        <i className="fas fa-shopping-cart" style={iconStyle}></i>
        <i className="fas fa-user" style={iconStyle}></i>
      </div>
    </div>
  );
};

// Inline Styles
const headerContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#003366", // Dark blue background
  padding: "10px 20px",
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
  color: "white",
  fontSize: "24px",
  fontWeight: "bold",
};

const navLinksStyle = {
  display: "flex",
  gap: "20px",
};

const navItemStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
  cursor: "pointer",
};

const iconsSectionStyle = {
  display: "flex",
  gap: "20px",
};

const iconStyle = {
  color: "white",
  fontSize: "24px",
  cursor: "pointer",
};

export default Header;
