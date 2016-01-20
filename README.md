[![Build Status](https://travis-ci.org/ItsAsbreuk/itsa-react-checkbox.svg?branch=master)](https://travis-ci.org/ItsAsbreuk/itsa-react-checkbox)

Beautiful iOS-stylisch checkbox for react.

Lightweight, focussable and responses to the spacebar.

## How to use:

```js
const React = require("react"),
    ReactDOM = require("react-dom"),
    Component = require("itsa-react-checkbox");

let props = {
    checked: true
};

const handleChange = () => {
    props.checked = !props.checked;
    renderCheckBox();
};

const renderCheckBox = () => {
    ReactDOM.render(
        <Component {...props} onChange={handleChange} />,
        document.getElementById("container")
    );
};

renderCheckBox();
```

[View live example](http://projects.itsasbreuk.nl/react-components/itsa-checkbox/component.html)

[API](http://projects.itsasbreuk.nl/react-components/itsa-checkbox/api/)