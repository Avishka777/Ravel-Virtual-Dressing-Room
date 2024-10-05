import React, { Component } from "react";

class Hairstyle extends Component {
  render() {
    const styles = {
      hairstyleClass: {}
    };
    if (this.props.selectedItem) {
      if (this.props.selectedItem.default === true) {
        styles.hairstyleClass = {};
      } else {
        styles.hairstyleClass = {
          width: "1000px",
          height: "1000px",
          background: `url(${this.props.selectedItem.imgSrc_png})`,
          position: "absolute",
          top: "-75%",
          left: "-60%",
          zIndex: "9",
          transform: "scale(0.16)"
        };
      }
    }
    return <div style={styles.hairstyleClass} />;
  }
}

export default Hairstyle;
