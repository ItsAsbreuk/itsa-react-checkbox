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

## About the css

You need the right css in order to make use of `itsa-react-checkbox`. There are 2 options:

1. You can use the css-files inside the `css`-folder.
2. You can use: `Component = require("itsa-react-checkbox/lib/component-styled.jsx");` and build your project with `webpack`. This is needed, because you need the right plugin to handle a requirement of the `scss`-file.


[View live example](http://projects.itsasbreuk.nl/react-components/itsa-checkbox/component.html)

[API](http://projects.itsasbreuk.nl/react-components/itsa-checkbox/api/)
