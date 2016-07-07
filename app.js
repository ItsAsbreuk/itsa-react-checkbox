"use strict";

const React = require("react"),
      ReactDOM = require("react-dom"),
      Component = require("./lib/component-styled.jsx");

let props = {
    checked: true,
    disabled: true,
    readOnly: true
};

let props2 = {
    labelOn: "On",
    labelOff: "Off",
    square: true,
    checked: false
};

const handleChange1 = () => {
    props.checked = !props.checked;
    renderCheckBox1();
};

const handleChange2 = () => {
    props2.checked = !props2.checked;
    renderCheckBox2();
};

const renderCheckBox1 = () => {
    ReactDOM.render(
        <Component {...props} onChange={handleChange1} />,
        document.getElementById("component-container")
    );
};

const renderCheckBox2 = () => {
    ReactDOM.render(
        <Component {...props2} onChange={handleChange2} />,
        document.getElementById("component-container2")
    );
};

renderCheckBox1();
renderCheckBox2();