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

require("itsa-jsext");

require("itsa-dom");

let IE8_Events;

const React = require("react"),
    ReactDom = require("react-dom"),
    PropTypes = require("prop-types"),
    later = require("itsa-utils").later,
    MAIN_CLASS = "itsa-checkbox",
    MAIN_CLASS_PREFIX = MAIN_CLASS+"-",
    FORM_ELEMENT_CLASS_SPACES = " itsa-formelement",
    BTN_WIDTH = 2, // em
    LABEL_WIDTH_CORRECTION = 0.8,
    ON = "on",
    MOUSE = "mouse",
    MOUSEUP = MOUSE+"up",
    MOUSEMOVE = MOUSE+"move",
    DEFAULT_LABEL_ON = "I",
    DEFAULT_LABEL_OFF = "O",
    EM = "em",
    CALC = "calc(",
    MINUS_TWO_PX = " - 2px)";

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        const instance = this;
        instance.state = {
            btnDragPos: false,
            transitioned: true
        };
        instance.detachDragEvents = instance.detachDragEvents.bind(instance);
        instance.focus = instance.focus.bind(instance);
        instance.handleBlur = instance.handleBlur.bind(instance);
        instance.handleClick = instance.handleClick.bind(instance);
        instance.handleFocus = instance.handleFocus.bind(instance);
        instance.handleKeyPress = instance.handleKeyPress.bind(instance);
        instance.handleMouseDown = instance.handleMouseDown.bind(instance);
        instance.handleMouseMove = instance.handleMouseMove.bind(instance);
        instance.handleMouseUp = instance.handleMouseUp.bind(instance);
        instance.handleTouchMove = instance.handleTouchMove.bind(instance);
        instance.handleTouchStart = instance.handleTouchStart.bind(instance);
        instance.setDragEvents = instance.setDragEvents.bind(instance);
    }

    /**
     * componentDidMount will call `this.activatePlaces()`;
     *
     * @method componentDidMount
     * @since 0.0.1
     */
    componentDidMount() {
        const instance = this;
        instance._domNode = ReactDom.findDOMNode(instance);
        IE8_Events = !instance._domNode.addEventListener;
        instance._constrainNode = instance._domNode.querySelector("."+MAIN_CLASS_PREFIX+"constrain");
        instance._containerNode = instance._domNode.querySelector("."+MAIN_CLASS_PREFIX+"container");
        instance._btnNode = instance._domNode.querySelector("."+MAIN_CLASS_PREFIX+"btn");
        if (instance.props.autoFocus) {
            instance._focusLater = later(() => instance.focus(), 50);
        }
    }

    /**
     * componentWilUnmount does some cleanup.
     *
     * @method componentWillUnmount
     * @since 0.0.1
     */
    componentWillUnmount() {
        this.detachDragEvents();
        this._focusLater && this._focusLater.cancel();
    }

    /**
     * Detaches some window-eventlisteners.
     *
     * @method detachDragEvents
     * @chainable
     * @since 0.0.1
     */
    detachDragEvents() {
        if (IE8_Events) {
            window.detachEvent(ON+MOUSEMOVE, this.handleMouseMove);
            window.detachEvent(ON+MOUSEUP, this.handleMouseUp);
        }
        else {
            window.removeEventListener(MOUSEMOVE, this.handleMouseMove, true);
            window.removeEventListener(MOUSEUP, this.handleMouseUp, true);
        }
        return this;
    }

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
    }

    /**
     * Callback-fn for the onBlur-event.
     * sets internal `_focussed`-property false
     *
     * @method handleBlur
     * @since 0.0.1
     */
    handleBlur() {
        this._focussed = false;
    }

    /**
     * Callback-fn for the onClick-event.
     * Will invoke `this.props.onChange`
     *
     * @method handleClick
     * @since 0.0.1
     */
    handleClick(e) {
        const instance = this,
            props = instance.props,
            onClick = props.onClick;
        if (!props.disabled && !props.readOnly) {
            if (!instance._wasDragged && props.onChange) {
                props.onChange();
            }
            instance._wasDragged = false;
        }
        onClick && onClick(e);
    }

    /**
     * Callback-fn for the onFocus-event.
     * sets internal `_focussed`-property true
     *
     * @method handleFocus
     * @since 0.0.1
     */
    handleFocus() {
        this._focussed = true;
    }

    /**
     * Callback-fn for the onKeyPress-event.
     * Will invoke `this.props.onChange` when the spacebar was pressed.
     *
     * @method handleKeyPress
     * @param e {Object} event-payload
     * @since 0.0.1
     */
    handleKeyPress(e) {
        const instance = this,
            props = instance.props;
        if (!props.disabled && !props.readOnly) {
            if (instance._focussed && (e.charCode===32)) {
                // prevent minus windowscroll:
                e.preventDefault();
                instance.handleClick();
            }
        }
    }

    /**
     * Callback-fn for the onMouseDown-event.
     * Prepares for dragging the button.
     *
     * @method handleMouseDown
     * @param e {Object} event-payload
     * @since 0.0.1
     */
    handleMouseDown(e) {
        const instance = this,
            props = instance.props;
        if ((e.buttons===1) && !props.disabled && !props.readOnly) {
            instance._mousedown = true;
            instance._containerLeft = instance._containerNode.itsa_left - instance._constrainNode.itsa_left;
            instance._mouseLeft = e.clientX;
            instance.setState({
                btnDragPos: instance._containerLeft
            });
            instance.setDragEvents();
        }
    }

    /**
     * Callback-fn for the onMouseMove-event.
     * Handles dragging of the button.
     *
     * @method handleMouseMove
     * @param e {Object} event-payload
     * @since 0.0.1
     */
    handleMouseMove(e) {
        let newPos;
        const instance = this,
            props = instance.props;
        if (instance._mousedown && !props.disabled && !props.readOnly) {
            instance._wasDragged = true;
            if (e.buttons===1) {
                newPos = instance._containerLeft + e.clientX - instance._mouseLeft;
                instance.setState({
                    btnDragPos: Math.max(2, Math.min(newPos, (instance._domNode.offsetWidth-instance._btnNode.offsetWidth-2))),
                    transitioned: false
                });
            } else {
                // mouse has been released outside the browser!
                instance.handleMouseUp();
            }
        }
    }

    /**
     * Callback-fn for the onMouseUp-event.
     * Finalizes button-dragging.
     *
     * @method handleMouseUp
     * @param noDetach {Boolean} to supress detaching the window-events, which are only set on desktop-devices
     * @since 0.0.1
     */
    handleMouseUp(noDetach) {
        let elementLeft, btnLeft, elementHalfWidth, btnHalfWidth, btnInsideLeftArea, stateChanged;
        const instance = this,
            props = instance.props;
        (noDetach===true) || instance.detachDragEvents();
        instance._mousedown = false;
        // check if the position is beyond the "state-change"
        // if so, then switch the position
        if (props.onChange) {
            elementLeft = instance._domNode.itsa_left;
            btnLeft = instance._btnNode.itsa_left;
            elementHalfWidth = instance._domNode.offsetWidth/2;
            btnHalfWidth = instance._btnNode.offsetWidth/2;
            btnInsideLeftArea = (btnLeft+btnHalfWidth) < (elementLeft+elementHalfWidth);
            stateChanged = (props.checked && btnInsideLeftArea) || (!props.checked && !btnInsideLeftArea);
            stateChanged && props.onChange();
        }
        // reset state:
        instance.setState({
            btnDragPos: false,
            transitioned: true
        });
    }

    /**
     * Callback-fn for the onTouchMove-event.
     * Handles dragging of the button on mobile devices.
     *
     * @method handleTouchMove
     * @param e {Object} event-payload
     * @since 0.0.1
     */
    handleTouchMove(e) {
        const instance = this,
            props = instance.props,
            newPos = instance._containerLeft + e.touches.clientX - instance._mouseLeft;
       if (!props.disabled && !props.readOnly) {
            instance.setState({
                btnDragPos: Math.max(0, Math.min(newPos, (instance._constrainNode.offsetWidth-instance._domNode.offsetWidth))),
                transitioned: false
            });
        }
    }

    /**
     * Callback-fn for the onTouchStart-event.
     * Prepares for dragging the button on mobile devices.
     *
     * @method handleTouchStart
     * @param e {Object} event-payload
     * @since 0.0.1
     */
    handleTouchStart(e) {
        const instance = this,
            props = instance.props;
        if (!props.disabled && !props.readOnly) {
            instance._containerLeft = instance._containerNode.itsa_left - instance._constrainNode.itsa_left;
            instance._mouseLeft = e.touches.clientX;
            instance.setState({
                btnDragPos: instance._containerLeft
            });
        }
    }

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

    /**
     * Sets some window-eventlisteners.
     *
     * @method setDragEvents
     * @chainable
     * @since 0.0.1
     */
    setDragEvents() {
        if (IE8_Events) {
            window.attachEvent(ON+MOUSEMOVE, this.handleMouseMove);
            window.attachEvent(ON+MOUSEUP, this.handleMouseUp);
        }
        else {
            window.addEventListener(MOUSEMOVE, this.handleMouseMove, true);
            window.addEventListener(MOUSEUP, this.handleMouseUp, true);
        }
        return this;
    }
}

Checkbox.defaultProps = {
    style: {},
    tabIndex: 0
};

Checkbox.propTypes = {
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
     * The callback whenever the checkbox is clicked.
     * Does not effect its behavious, but can be used to stop propagation
     *
     * @property onClick
     * @type Function
     * @since 0.0.1
    */
    onClick: PropTypes.func,

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
};

module.exports = Checkbox;
