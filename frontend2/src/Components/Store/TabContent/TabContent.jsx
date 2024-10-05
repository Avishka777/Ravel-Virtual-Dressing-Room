import React, { Component } from "react";
import TabPane from "./TabPane/TabPane";
import ButtonArr from "../../../Data/ButtonArr";

class TabContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonArr: ButtonArr,
      topclothes: null,
      botclothes: null,
      shoes: null,
      handbags: null,
      necklaces: null,
      hairstyle: null,
      background: null
    };
  }
  getSelectedItemTabContent(selectedItem) {
    this.setState({
      [selectedItem.type]: selectedItem
    })
    this.props.getSelectedItemStore(selectedItem);
  }
  render() {
    const templateListTabPane = this.state.buttonArr.map((item, index) => (
      <TabPane
        key={index}
        tabPane={item}
        index={index}
        selectedItem={this.state[item.type]}
        className="custom-btn-group"
        getSelectedItemTabContent={this.getSelectedItemTabContent.bind(this)}
      />
    ));
    return <div className="tab-content">{templateListTabPane}</div>;
  }
}

export default TabContent;
