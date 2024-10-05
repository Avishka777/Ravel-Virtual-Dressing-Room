import React, { Component } from "react";
import TabContent from "./TabContent/TabContent";

class Store extends Component {
  getSelectedItemStore(selectedItem) {
    this.props.getSelectedItemApp(selectedItem);
  }
  render() {
    return (
      <div className="well">
        <TabContent
          getSelectedItemStore={this.getSelectedItemStore.bind(this)}
        />
      </div>
    );
  }
}

export default Store;
