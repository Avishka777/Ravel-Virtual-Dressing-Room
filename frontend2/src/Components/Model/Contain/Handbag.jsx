import React, { Component } from "react";

class Handbag extends Component {
  render() {
    const styles = {
      handbagClass: {}
    };
    if (this.props.selectedItem) {
      if (this.props.selectedItem.default === true) {
        styles.handbagClass = {};
      } else {
        styles.handbagClass = {
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
    return <div style={styles.handbagClass} />;
  }
}

export default Handbag;
