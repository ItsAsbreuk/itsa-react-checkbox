"use strict";

const isNode = (typeof global!=='undefined') && ({}.toString.call(global)==='[object global]') && (!global.document || ({}.toString.call(global.document)!=='[object HTMLDocument]'));

const getScrollOffsets = () => {
    if (isNode) {
        return {
            x: 0,
            y: 0
        }
    }
    const doc = window.document;
    // this works for all browsers in non quircks-mode and only for IE9+:
    if (window.pageXOffset!==undefined) { // do not "just" check for `window.pageXOffset` --> it could be `0`
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        };
    }
    // for IE (or any other browser) in standards mode
    if (doc.compatMode === 'CSS1Compat') {
        return {
            x: doc.documentElement.scrollLeft,
            y: doc.documentElement.scrollTop
        };
    }
    // for browsers in quircks mode:
    return {
        x: doc.body.scrollLeft,
        y: doc.body.scrollTop
    };
};

const windowScrollLeft = () => {
    return getScrollOffsets().x;
};

const windowScrollTop = () => {
    return getScrollOffsets().y;
};

const getNodeLeft = node => {
    return Math.round(node.getBoundingClientRect().left + windowScrollLeft());
};

const getNodeTop = node => {
    return Math.round(node.getBoundingClientRect().top + windowScrollTop());
};

export default {
    getNodeLeft,
    getNodeTop,
    windowScrollLeft,
    windowScrollTop
}