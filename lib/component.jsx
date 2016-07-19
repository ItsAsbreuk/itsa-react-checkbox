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

require("itsa-jsext/lib/object");
require("itsa-dom");

const React = require("react"),
    PropTypes = React.PropTypes,
    ReactDom = require("react-dom"),
    later = require("itsa-utils").later,
    checkboxEvents = require("./checkbox-events"),
    MAIN_CLASS = "itsa-checkbox",
    MAIN_CLASS_PREFIX = MAIN_CLASS+"-",
    FORM_ELEMENT_CLASS_SPACES = " itsa-formelement",
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
         * Whether the checkbox is disabled
         *
         * @property disabled
         * @type Boolean
         * @default false
         * @since 15.2.0
        */
        disabled: PropTypes.bool,

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
         * Whether the checkbox is readonly
         *
         * @property readOnly
         * @type Boolean
         * @default false
         * @since 15.2.0
        */
        readOnly: PropTypes.bool,

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
         * Inline style
         *
         * @property style
         * @type object
         * @since 0.0.1
        */
        style: PropTypes.object,

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
        if (instance.props.autoFocus) {
            instance._focusLater = later(() => instance.focus(), 50);
        }
    },

    /**
     * componentWilUnmount does some cleanup.
     *
     * @method componentWillUnmount
     * @since 0.0.1
     */
    componentWillUnmount() {
        this._focusLater && this._focusLater.cancel();
    },

    /**
     * Sets the focus on the Component.
     *
     * @method focus
     * @param [transitionTime] {Number} transition-time to focus the element into the view
     * @chainable
     * @since 0.0.1
     */
    focus(transitionTime) {
        var instance = this;
        instance._domNode.itsa_focus && instance._domNode.itsa_focus(null, null, transitionTime);
        return instance;
    },

    /**
     * Returns the default props.
     *
     * @method getDefaultProps
     * @return Object
     * @since 0.0.1
     */
    getDefaultProps() {
        return {
            style: {}
        };
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
            elementStyles, constrainStyles, constainerStyles, labelStylesOn, labelStylesOff,
            labelWidth, elementWidth, constrainWidth, btnStyles, className, ariaLabel;

        const instance = this, // optimize for uglifyjs which cannot compress `this`
              props = instance.props, // optimize for uglifyjs which cannot compress object-property names
              labelOn = props.labelOn || DEFAULT_LABEL_ON,
              labelOff = props.labelOff || DEFAULT_LABEL_OFF,
              tabIndex = props.tabIndex,
              errored = ((props.validated===false) && props.formValidated),
              checked = props.checked;

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
            left: instance._mousedown ? instance.state.btnDragPos+"px" : (checked ? labelWidth+EM : 0)
        };
        labelStylesOn = {
            width: CALC+elementWidth+EM+MINUS_TWO_PX
        };
        labelStylesOff = {
            width: CALC+elementWidth+EM+MINUS_TWO_PX
        };
        btnStyles = {
            left: checked ? CALC+labelWidth+EM+MINUS_TWO_PX : labelWidth+EM
        };
        instance.state.transitioned || (classNameContainer+=" notrans");

        className = MAIN_CLASS+FORM_ELEMENT_CLASS_SPACES;
        props.className && (className+=" "+props.className);
        props.square || (className+=" bordered");
        errored && (className+=" error");
        props.disabled && (className+=" disabled");
        props.readOnly && (className+=" readonly");
        ariaLabel = checked ? labelOn : labelOff;

        props.fontSize && (elementStyles.fontSize=props.fontSize);
        props.colorChecked && (labelStylesOn.color=props.colorChecked);
        props.bgChecked && (labelStylesOn.backgroundColor=props.bgChecked);
        props.colorUnchecked && (labelStylesOff.color=props.colorUnchecked);
        props.bgUnchecked && (labelStylesOff.backgroundColor=props.bgUnchecked);
        props.bgButton && (btnStyles.backgroundColor=props.bgButton);
        elementStyles.itsa_merge(props.style, {force: "full"});

        // ======================================================================================================
        // ======================================================================================================

        return (
            <div className={className}
                aria-invalid={errored}
                aria-label={ariaLabel}
                aria-checked={checked}
                onBlur={instance.handleBlur}
                onClick={instance.handleClick}
                onFocus={instance.handleFocus}
                onKeyPress={instance.handleKeyPress}
                role="checkbox"
                style={elementStyles}
                tabIndex={tabIndex} >

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
