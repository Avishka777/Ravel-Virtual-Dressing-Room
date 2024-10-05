import React from "react";

const Button = props => {
  let buttonActiveClass = props.index === 0 ? "btn-primary" : "btn-default";
  return (
    <div className="btn-group" role="group">
      <button
        type="button"
        id={props.button.type}
        className={`btn ${buttonActiveClass}`}
        href={`#${props.button.tabName}`}
        data-toggle="tab"
      >
        <div className="hidden-xs">{props.button.showName}</div>
      </button>
    </div>
  );
};

export default Button;
