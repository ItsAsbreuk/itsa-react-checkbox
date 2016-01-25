"use strict";

/**
 * React-Component: iOS-stylish checkbox.
 *
 *
 *
 * <i>Copyright (c) 2016 itsasbreuk - http://itsasbreuk.nl</i><br>
 * New BSD License - http://choosealicense.com/licenses/bsd-3-clause/
 *
 *
 * @module itsa-react-checkbox
 * @class Checkbox
 * @since 2.0.0
*/

import React, {PropTypes} from "react";
import ReactDom from "react-dom";
import checkboxEvents from "./checkbox-events";

const MAIN_CLASS = "itsa-checkbox",
      MAIN_CLASS_PREFIX = MAIN_CLASS+"-",
      BTN_WIDTH = 2, // em
      LABEL_WIDTH_CORRECTION = 0.8,
      DEFAULT_LABEL_ON = "I",
      DEFAULT_LABEL_OFF = "O",
      EM = "em",
      CALC = "calc(",
      MINUS_TWO_PX = " - 2px)";

const Checkbox = React.createClass({

    propTypes: {
        /**
         * Whether to autofocus the Component.
         *
         * @property autoFocus
         * @type Boolean
         * @since 0.0.1
        */
        autoFocus: PropTypes.bool,

        /**
         * Background-color of the `checked`-label
         *
         * @property bgChecked
         * @type String
         * @default "#0078E7"
         * @since 0.0.1
        */
        bgChecked: PropTypes.string,

        /**
         * Background-color of the `checked`-label
         *
         * @property bgButton
         * @type String
         * @default "#CCC"
         * @since 0.0.1
        */
        bgButton: PropTypes.string,

        /**
         * Background-color of the `unchecked`-label
         *
         * @property bgUnchecked
         * @type String
         * @default "#FFF"
         * @since 0.0.1
        */
        bgUnchecked: PropTypes.string,

        /**
         * Whether the checkbox is checked
         * <b>required</b>
         *
         * @property checked
         * @default false
         * @since 0.0.1
        */
        checked: PropTypes.bool.isRequired,

        /**
         * The class that should be set on the element
         *
         * @property className
         * @type String
         * @since 0.0.1
        */
        className: PropTypes.string,

        /**
         * Font-color of the `checked`-label
         *
         * @property colorChecked
         * @type String
         * @default "#FFF"
         * @since 0.0.1
        */
        colorChecked: PropTypes.string,

        /**
         * The font-color of the `unchecked`-label
         *
         * @property colorUnchecked
         * @type String
         * @default "#444"
         * @since 0.0.1
        */
        colorUnchecked: PropTypes.string,

        /**
         * Whether the parent-form has been validated.
         * This value is needed to determine if the validate-status should be set.
         *
         * @property formValidated
         * @type Boolean
         * @since 0.2.0
        */
        formValidated: PropTypes.bool,

        /**
         * The label when switched `off`
         *
         * @property labelOff
         * @type String
         * @default "O"
         * @since 0.0.1
        */
        labelOff: PropTypes.string,

        /**
         * The label when switched `on`
         *
         * @property labelOn
         * @type String
         * @default "I"
         * @since 0.0.1
        */
        labelOn: PropTypes.string,

        /**
         * The callback whenever the checkbox wants to change its value.
         * Use this callback to change `this.prop.checked` of the element
         * <b>required</b>
         *
         * @property onChange
         * @type Function
         * @since 0.0.1
        */
        onChange: PropTypes.func.isRequired,

        /**
         * font-size of the element. Best specified in `em`
         *
         * @property fontSize
         * @type String
         * @default "0.9em"
         * @since 0.0.1
        */
        fontSize: PropTypes.string,

        /**
         * Whether the checkbox should be rendered in a `square`-style instead of rounded
         *
         * @property square
         * @type Boolean
         * @default false
         * @since 0.0.1
        */
        square: PropTypes.bool,

        /**
         * The tabindex of the Component.
         *
         * @property type
         * @type Number
         * @since 0.1.2
        */
        tabIndex: PropTypes.number,

        /**
         * Whether the property is validated right.
         *
         * @property validated
         * @type Boolean
         * @since 0.0.1
        */
        validated: PropTypes.bool,

        /**
         * The width of the element: when not set, it will be auto-fitted.
         * You should specify a number, which is used as `em`-width.
         *
         * @property width
         * @type Number
         * @since 0.0.1
        */
        width: PropTypes.number

    },

    mixins: [checkboxEvents],

    /**
     * componentDidMount will call `this.activatePlaces()`;
     *
     * @method componentDidMount
     * @since 0.0.1
     */
    componentDidMount() {
        const instance = this;
        instance._domNode = ReactDom.findDOMNode(instance);
        instance.props.autoFocus && instance.focus();
    },

    /**
     * Sets the focus on the Component.
     *
     * @method focus
     * @chainable
     * @since 0.0.1
     */
    focus() {
        this._domNode.focus();
        return this;
    },

    /**
     * Returns the initial state.
     *
     * @method getInitialState
     * @return Object
     * @since 0.0.1
     */
    getInitialState() {
        return {
            btnDragPos: false,
            transitioned: true
        };
    },

    /**
     * React render-method --> renderes the Component.
     *
     * @method render
     * @return ReactComponent
     * @since 0.0.1
     */
    render() {

        let classNameContainer = MAIN_CLASS_PREFIX+"container",
            elementStyles, constrainStyles, constainerStyles, labelStylesOn, labelStylesOff, labelWidth, elementWidth, constrainWidth, btnStyles, className;

        const instance = this, // optimize for uglifyjs which cannot compress `this`
              props = instance.props, // optimize for uglifyjs which cannot compress object-property names
              labelOn = props.labelOn || DEFAULT_LABEL_ON,
              labelOff = props.labelOff || DEFAULT_LABEL_OFF,
              tabIndex = props.tabIndex || 1,
              errored = ((props.validated===false) && props.formValidated);

        labelWidth = props.width ? parseFloat(props.width) : Math.round(LABEL_WIDTH_CORRECTION*Math.max(labelOn.length, labelOff.length)) + 1;
        elementWidth = labelWidth + BTN_WIDTH;
        constrainWidth = elementWidth + labelWidth;

        // ======================================================================================================
        // === defining styles ==================================================================================
        // ======================================================================================================
        elementStyles = {
            width: elementWidth+EM
        };
        constrainStyles = {
            left: "-"+labelWidth+EM,
            width: constrainWidth+EM
        };
        constainerStyles = {
            left: instance._mousedown ? instance.state.btnDragPos+"px" : (props.checked ? labelWidth+EM : "0")
        };
        labelStylesOn = {
            width: CALC+elementWidth+EM+MINUS_TWO_PX
        };
        labelStylesOff = {
            width: CALC+elementWidth+EM+MINUS_TWO_PX
        };
        btnStyles = {
            left: props.checked ? CALC+labelWidth+EM+MINUS_TWO_PX : labelWidth+EM
        };
        instance.state.transitioned || (classNameContainer+=' notrans');

        className = MAIN_CLASS;
        props.className && (className+=" "+props.className);
        props.square || (className+=" bordered");
        errored && (className+=" error");

        props.fontSize && (elementStyles.fontSize=props.fontSize);
        props.colorChecked && (labelStylesOn.color=props.colorChecked);
        props.bgChecked && (labelStylesOn.backgroundColor=props.bgChecked);
        props.colorUnchecked && (labelStylesOff.color=props.colorUnchecked);
        props.bgUnchecked && (labelStylesOff.backgroundColor=props.bgUnchecked);
        props.bgButton && (btnStyles.backgroundColor=props.bgButton);
        // ======================================================================================================
        // ======================================================================================================

        return (
            <div className={className}
                tabIndex={tabIndex}
                style={elementStyles}
                onClick={instance.handleClick}
                onBlur={instance.handleBlur}
                onFocus={instance.handleFocus}
                onKeyPress={instance.handleKeyPress} >

                <div className={MAIN_CLASS_PREFIX+"constrain"} style={constrainStyles}>
                    <div className={classNameContainer} style={constainerStyles}>
                        <div className={MAIN_CLASS_PREFIX+"on"} style={labelStylesOn}>{labelOn}</div>
                        <div className={MAIN_CLASS_PREFIX+"off"} style={labelStylesOff}>{labelOff}</div>
                        <div className={MAIN_CLASS_PREFIX+"btn"}
                            onMouseDown={instance.handleMouseDown}
                            onTouchStart={instance.handleTouchStart}
                            onTouchMove={instance.handleTouchMove}
                            onTouchEnd={instance.handleMouseUp.bind(this, true)}
                            style={btnStyles} />
                    </div>
                </div>

            </div>
        );
    }

});

module.exports = Checkbox;
