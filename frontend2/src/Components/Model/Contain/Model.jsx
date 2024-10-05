import React from "react";
const styles = {
  // .model
  modelClass: {
    width: "60px",
    height: "77px",
    background: 'url("images/model/1000new.png")',
    position: "absolute",
    top: "5%",
    left: "45.5%",
    zIndex: "1"
  }
};

const Model = () => {
  return <div style={styles.modelClass} />;
};

export default Model;
