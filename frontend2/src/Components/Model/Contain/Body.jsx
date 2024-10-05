import React from "react";
const styles = {
  // .body
  bodyClass: {
    width: "250px",
    height: "500px",
    background: 'url("images/allbody/bodynew.png")',
    position: "absolute",
    top: "12%",
    left: "22%"
  }
};

const Body = () => {
  return <div style={styles.bodyClass} />;
};

export default Body;
