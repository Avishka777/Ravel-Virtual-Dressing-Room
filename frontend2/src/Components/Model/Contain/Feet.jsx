import React, { Component } from "react";

const feetLeftClass = {
  width: "25px",
  height: "41px",
  background: 'url("images/allbody/feet_high_leftnew.png")',
  position: "absolute",
  bottom: "6.5%",
  left: "40.4%",
  zIndex: "1"
};
const feetRightClass = {
  width: "25px",
  height: "41px",
  background: "url(images/allbody/feet_high_rightnew.png)",
  position: "absolute",
  bottom: "6.5%",
  right: "33.3%",
  zIndex: "1"
};
class Feet extends Component {
  render() {
    const styles = {
      // .feetLeft
      feetLeftClass,
      // .feetRight
      feetRightClass
    };
    if (this.props.selectedItem) {
      if (this.props.selectedItem.default === true) {
        styles.feetLeftClass = feetLeftClass;
        styles.feetRightClass = feetRightClass;
      } else {
        styles.feetLeftClass = {
          width: "500px",
          height: "1000px",
          background: `url(${this.props.selectedItem.imgSrc_png})`,
          position: "absolute",
          top: "-30%",
          left: "-5%",
          zIndex: "3",
          transform: "scale(0.5)"
        };
        styles.feetRightClass = {
          width: "500px",
          height: "1000px",
          background: `url(${this.props.selectedItem.imgSrc_png})`,
          position: "absolute",
          top: "-30%",
          left: "-5%",
          zIndex: "3",
          transform: "scale(0.5)"
        };
      }
    }
    const styleFeet =
      this.props.type === "left" ? styles.feetLeftClass : styles.feetRightClass;
    return <div style={styleFeet} />;
  }
}

export default Feet;
