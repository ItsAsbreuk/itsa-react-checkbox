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

import domUtils from "./dom-utils";
import ReactDOM from "react-dom";

const MAIN_CLASS_PREFIX = "itsa-checkbox-",
      MOUSE = "mouse",
      MOUSEUP = MOUSE+"up",
      MOUSEMOVE = MOUSE+"move";

const checkboxEvents = {

    /**
     * Gets invoked after the Component mounted.
     * Will set several refences to internal nodes for quick referal.
     *
     * @method componentDidMount
     * @since 0.0.1
     */
    componentDidMount() {
        const instance = this;
        instance._node = ReactDOM.findDOMNode(this);
        instance._constrainNode = instance._node.querySelector("."+MAIN_CLASS_PREFIX+"constrain");
        instance._containerNode = instance._node.querySelector("."+MAIN_CLASS_PREFIX+"container");
        instance._btnNode = instance._node.querySelector("."+MAIN_CLASS_PREFIX+"btn");
    },

    /**
     * Gets invoked before the Component gets unmounted.
     * Will detach some window-eventlisteners.
     *
     * @method componentWillUnmount
     * @since 0.0.1
     */
    componentWillUnmount() {
        this.detachDragEvents();
    },

    /**
     * Detaches some window-eventlisteners.
     *
     * @method detachDragEvents
     * @chainable
     * @since 0.0.1
     */
    detachDragEvents() {
        window.removeEventListener(MOUSEMOVE, this.handleMouseMove, true);
        window.removeEventListener(MOUSEUP, this.handleMouseUp, true);
        return this;
    },

    /**
     * Callback-fn for the onBlur-event.
     * sets internal `_focussed`-property false
     *
     * @method handleBlur
     * @since 0.0.1
     */
    handleBlur() {
        this._focussed = false;
    },

    /**
     * Callback-fn for the onClick-event.
     * Will invoke `this.props.onChange`
     *
     * @method handleClick
     * @since 0.0.1
     */
    handleClick() {
        const instance = this;
        if (!instance._wasDragged && instance.props.onChange) {
            instance.props.onChange();
        }
        instance._wasDragged = false;
    },

    /**
     * Callback-fn for the onFocus-event.
     * sets internal `_focussed`-property true
     *
     * @method handleFocus
     * @since 0.0.1
     */
    handleFocus() {
        this._focussed = true;
    },

    /**
     * Callback-fn for the onKeyPress-event.
     * Will invoke `this.props.onChange` when the spacebar was pressed.
     *
     * @method handleKeyPress
     * @param e {Object} event-payload
     * @since 0.0.1
     */
    handleKeyPress(e) {
        if (this._focussed && (e.charCode===32)) {
            this.handleClick();
        }
    },

    /**
     * Callback-fn for the onMouseDown-event.
     * Prepares for dragging the button.
     *
     * @method handleMouseDown
     * @param e {Object} event-payload
     * @since 0.0.1
     */
    handleMouseDown(e) {
        const instance = this;
        if (e.buttons===1) {
            instance._mousedown = true;
            instance._containerLeft = domUtils.getNodeLeft(instance._containerNode) - domUtils.getNodeLeft(instance._constrainNode);
            instance._mouseLeft = e.clientX;
            instance.setState({
                btnDragPos: instance._containerLeft
            });
            instance.setDragEvents();
        }
    },

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
        const instance = this;
        if (instance._mousedown) {
            instance._wasDragged = true;
            if (e.buttons===1) {
                newPos = instance._containerLeft + e.clientX - instance._mouseLeft;
                instance.setState({
                    btnDragPos: Math.max(2, Math.min(newPos, (instance._node.offsetWidth-instance._btnNode.offsetWidth-2))),
                    transitioned: false
                });
            } else {
                // mouse has been released outside the browser!
                instance.handleMouseUp();
            }
        }
    },

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
        const instance = this;
        (noDetach===true) || instance.detachDragEvents();
        instance._mousedown = false;
        // check if the position is beyond the "state-change"
        // if so, then switch the position
        if (instance.props.onChange) {
            elementLeft = domUtils.getNodeLeft(instance._node);
            btnLeft = domUtils.getNodeLeft(instance._btnNode);
            elementHalfWidth = instance._node.offsetWidth/2;
            btnHalfWidth = instance._btnNode.offsetWidth/2;
            btnInsideLeftArea = (btnLeft+btnHalfWidth) < (elementLeft+elementHalfWidth);
            stateChanged = (instance.props.checked && btnInsideLeftArea) || (!instance.props.checked && !btnInsideLeftArea)
            stateChanged && instance.props.onChange();
        }
        // reset state:
        instance.setState({
            btnDragPos: false,
            transitioned: true
        });
    },

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
              newPos = instance._containerLeft + e.touches.clientX - instance._mouseLeft;
        instance.setState({
            btnDragPos: Math.max(0, Math.min(newPos, (instance._constrainNode.offsetWidth-instance._node.offsetWidth))),
            transitioned: false
        });
    },

    /**
     * Callback-fn for the onTouchStart-event.
     * Prepares for dragging the button on mobile devices.
     *
     * @method handleTouchStart
     * @param e {Object} event-payload
     * @since 0.0.1
     */
    handleTouchStart(e) {
        const instance = this;
        instance._containerLeft = domUtils.getNodeLeft(instance._containerNode) - domUtils.getNodeLeft(instance._constrainNode);
        instance._mouseLeft = e.touches.clientX;
        instance.setState({
            btnDragPos: instance._containerLeft
        });
    },

    /**
     * Sets some window-eventlisteners.
     *
     * @method setDragEvents
     * @chainable
     * @since 0.0.1
     */
    setDragEvents() {
        window.addEventListener(MOUSEMOVE, this.handleMouseMove, true);
        window.addEventListener(MOUSEUP, this.handleMouseUp, true);
        return this;
    }

};

export default checkboxEvents;
