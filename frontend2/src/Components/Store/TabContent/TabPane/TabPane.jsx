import React, { Component } from "react";
import Item from "./Item/Item";
import Instance from "../../../../Data/Instance";

class TabPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: Instance.room
    };
  }
  getListItem() {
    return this.state.listItem.filter(
      item => item.type === this.props.tabPane.type
    );
  }
  getSelectedItemTabPane(selectedItem) {
    this.props.getSelectedItemTabContent(selectedItem);
  }
  getTemplateTabPane() {
    const templateTabPane = this.getListItem().map((item, index) => {
      let selectedItem = false;
      if(this.props.selectedItem) {
        if(item.id === this.props.selectedItem.id) selectedItem = true;
      }
      return (
        <Item
          key={index}
          item={item}
          selectedItem={selectedItem}
          getSelectedItemTabPane={this.getSelectedItemTabPane.bind(this)}
        />
      );
    });
    return templateTabPane;
  }
  render() {
    const templateTabPane = this.getTemplateTabPane();
    let tabPaneActiveClass = this.props.index === 0 ? "active" : "";
    return (
      <div
        className={`tab-pane fade in ${tabPaneActiveClass}`}
        id={this.props.tabPane.tabName}
      >
        <div className="row">{templateTabPane}</div>
      </div>
    );
  }
}

export default TabPane;
