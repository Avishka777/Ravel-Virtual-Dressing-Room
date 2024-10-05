import React, { Component } from "react";
import Button from "./Button/Button";
import ButtonArr from "../../Data/ButtonArr";
import $ from "jquery";

class BtnGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonArr: ButtonArr
    };
  }
  render() {
    $(document).ready(function() {
      $(".btn-pref .btn").click(function() {
        $(".btn-pref .btn")
          .removeClass("btn-primary")
          .addClass("btn-default");
        // $(".tab").addClass("active"); // instead of this do the below
        $(this)
          .removeClass("btn-default")
          .addClass("btn-primary");
      });
    });
    const templateButtonArr = this.state.buttonArr.map((button, index) => (
      <Button button={button} index={index} key={index} className=""/>
    ));
    return (
      <div
        className="btn-pref btn-group btn-group-justified btn-group-lg custom-btn-group"
        role="group"
        aria-label="..."
       
      >
        {templateButtonArr}
      </div>
    );
  }
}

export default BtnGroup;
