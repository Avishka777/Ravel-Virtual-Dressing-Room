import React, { Component } from "react";

class Necklace extends Component {
  render() {
    const styles = {
      necklaceClass: {}
    };
    if (this.props.selectedItem) {
      if (this.props.selectedItem.default === true) {
        styles.necklaceClass = {};
      } else {
        styles.necklaceClass = {
          width: "500px",
          height: "1000px",
          background: `url(${this.props.selectedItem.imgSrc_png})`,
          position: "absolute",
          top: "-30%",
          left: "-5%",
          zIndex: "7",
          transform: "scale(0.5)"
        };
      }
    }
    return <div style={styles.necklaceClass} />;
  }
}

export default Necklace;
