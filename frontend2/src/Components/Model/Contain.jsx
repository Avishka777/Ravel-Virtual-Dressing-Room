import React, { Component } from "react";
import Body from "./Contain/Body";
import Model from "./Contain/Model";
import Bikini from "./Contain/Bikini";
import Feet from "./Contain/Feet";
import Handbag from "./Contain/Handbag";
import Necklace from "./Contain/Necklace";
import Hairstyle from "./Contain/Hairstyle";

const containClass = {
  width: "460px",
  height: "590px",
  margin: "0 auto",
  background: 'url("./images/background/background_998.jpg")',
  position: "relative"
}
const styles = {
  // .contain
  containClass
};

export default class Contain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topclothes: null,
      botclothes: null,
      shoes: null,
      handbags: null,
      necklaces: null,
      hairstyle: null,
      background: null
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      [nextProps.selectedItem.type]: nextProps.selectedItem
    });
  }
  render() {
    if (this.state.background) {
      if (this.state.background.default === true) {
        styles.containClass = containClass;
      } else {
        styles.containClass = {
          ...styles.containClass,
          background: `url(${this.state.background.imgSrc_png})`,
          default: false
        };
      }
    }
    return (
      <div style={styles.containClass}>
        <Body />
        <Model />
        <Bikini type="top" selectedItem={this.state.topclothes} />
        <Bikini type="bottom" selectedItem={this.state.botclothes} />
        <Feet type="left" selectedItem={this.state.shoes} />
        <Feet type="right" selectedItem={this.state.shoes} />
        <Handbag selectedItem={this.state.handbags} />
        <Necklace selectedItem={this.state.necklaces} />
        <Hairstyle selectedItem={this.state.hairstyle} />
      </div>
    );
  }
}
