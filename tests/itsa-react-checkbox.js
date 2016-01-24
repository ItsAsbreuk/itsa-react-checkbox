/*global describe, it, before, after */

"use strict";
const React = require("react");
const ReactDOM = require("react-dom");
const TestUtils = require("react-addons-test-utils");

const chai = require("chai");
const expect = chai.expect;
const equalJSX = require("chai-equal-jsx");
const renderer = TestUtils.createRenderer();

chai.use(equalJSX);

const Component = require("../lib/component.jsx");
const NOOP = () => {};

describe("React Component", function () {

    before(function () {
        this.jsdom = require("jsdom-global")();
    });

    after(function () {
        this.jsdom();
    });

    it("Rendering unchecked component", function () {
        renderer.render(<Component checked={false} onChange={NOOP} />);
        const actual = renderer.getRenderOutput();
        const expected = (
            <div className="itsa-checkbox bordered"
              onBlur={function noRefCheck() {}}
              onClick={function noRefCheck() {}}
              onFocus={function noRefCheck() {}}
              onKeyPress={function noRefCheck() {}}
              style={{width: "4em"}}
              tabIndex={1}>
              <div className="itsa-checkbox-constrain" style={{left: "-2em", width: "6em"}}>
                <div className="itsa-checkbox-container" style={{left: "0"}}>
                  <div className="itsa-checkbox-on" style={{width: "calc(4em - 2px)"}}>I</div>
                  <div className="itsa-checkbox-off" style={{width: "calc(4em - 2px)"}}>O</div>
                  <div
                    className="itsa-checkbox-btn"
                    onMouseDown={function noRefCheck() {}}
                    onTouchEnd={function noRefCheck() {}}
                    onTouchMove={function noRefCheck() {}}
                    onTouchStart={function noRefCheck() {}}
                    style={{left: "2em"}} />
                </div>
              </div>
            </div>
        );
        expect(actual).to.equalJSX(expected);
    });

    it("Rendering checked component", function () {
        renderer.render(<Component checked={true} onChange={NOOP} />);
        const actual = renderer.getRenderOutput();
        const expected = (
            <div className="itsa-checkbox bordered"
              onBlur={function noRefCheck() {}}
              onClick={function noRefCheck() {}}
              onFocus={function noRefCheck() {}}
              onKeyPress={function noRefCheck() {}}
              style={{width: "4em"}}
              tabIndex={1}>
              <div className="itsa-checkbox-constrain" style={{left: "-2em", width: "6em"}}>
                <div className="itsa-checkbox-container" style={{left: "2em"}}>
                  <div className="itsa-checkbox-on" style={{width: "calc(4em - 2px)"}}>I</div>
                  <div className="itsa-checkbox-off" style={{width: "calc(4em - 2px)"}}>O</div>
                  <div
                    className="itsa-checkbox-btn"
                    onMouseDown={function noRefCheck() {}}
                    onTouchEnd={function noRefCheck() {}}
                    onTouchMove={function noRefCheck() {}}
                    onTouchStart={function noRefCheck() {}}
                    style={{left: "calc(2em - 2px)"}} />
                </div>
              </div>
            </div>
        );
        expect(actual).to.equalJSX(expected);
    });

    it("Rendering component with different labels", function () {
        renderer.render(<Component labelOn="ON" labelOff="OFF" checked={false} onChange={NOOP} />);
        const actual = renderer.getRenderOutput();
        const expected = (
            <div className="itsa-checkbox bordered"
              onBlur={function noRefCheck() {}}
              onClick={function noRefCheck() {}}
              onFocus={function noRefCheck() {}}
              onKeyPress={function noRefCheck() {}}
              style={{width: "5em"}}
              tabIndex={1}>
              <div className="itsa-checkbox-constrain" style={{left: "-3em", width: "8em"}}>
                <div className="itsa-checkbox-container" style={{left: "0"}}>
                  <div className="itsa-checkbox-on" style={{width: "calc(5em - 2px)"}}>ON</div>
                  <div className="itsa-checkbox-off" style={{width: "calc(5em - 2px)"}}>OFF</div>
                  <div
                    className="itsa-checkbox-btn"
                    onMouseDown={function noRefCheck() {}}
                    onTouchEnd={function noRefCheck() {}}
                    onTouchMove={function noRefCheck() {}}
                    onTouchStart={function noRefCheck() {}}
                    style={{left: "3em"}} />
                </div>
              </div>
            </div>
        );
        expect(actual).to.equalJSX(expected);
    });

    it("Rendering component with fixed width", function () {
        renderer.render(<Component width={10} checked={false} onChange={NOOP} />);
        const actual = renderer.getRenderOutput();
        const expected = (
            <div className="itsa-checkbox bordered"
              onBlur={function noRefCheck() {}}
              onClick={function noRefCheck() {}}
              onFocus={function noRefCheck() {}}
              onKeyPress={function noRefCheck() {}}
              style={{width: "12em"}}
              tabIndex={1}>
              <div className="itsa-checkbox-constrain" style={{left: "-10em", width: "22em"}}>
                <div className="itsa-checkbox-container" style={{left: "0"}}>
                  <div className="itsa-checkbox-on" style={{width: "calc(12em - 2px)"}}>I</div>
                  <div className="itsa-checkbox-off" style={{width: "calc(12em - 2px)"}}>O</div>
                  <div
                    className="itsa-checkbox-btn"
                    onMouseDown={function noRefCheck() {}}
                    onTouchEnd={function noRefCheck() {}}
                    onTouchMove={function noRefCheck() {}}
                    onTouchStart={function noRefCheck() {}}
                    style={{left: "10em"}} />
                </div>
              </div>
            </div>
        );
        expect(actual).to.equalJSX(expected);
    });

    it("Rendering component with className", function () {
        renderer.render(<Component className="test" checked={false} onChange={NOOP} />);
        const actual = renderer.getRenderOutput();
        const expected = (
            <div className="itsa-checkbox test bordered"
              onBlur={function noRefCheck() {}}
              onClick={function noRefCheck() {}}
              onFocus={function noRefCheck() {}}
              onKeyPress={function noRefCheck() {}}
              style={{width: "4em"}}
              tabIndex={1}>
              <div className="itsa-checkbox-constrain" style={{left: "-2em", width: "6em"}}>
                <div className="itsa-checkbox-container" style={{left: "0"}}>
                  <div className="itsa-checkbox-on" style={{width: "calc(4em - 2px)"}}>I</div>
                  <div className="itsa-checkbox-off" style={{width: "calc(4em - 2px)"}}>O</div>
                  <div
                    className="itsa-checkbox-btn"
                    onMouseDown={function noRefCheck() {}}
                    onTouchEnd={function noRefCheck() {}}
                    onTouchMove={function noRefCheck() {}}
                    onTouchStart={function noRefCheck() {}}
                    style={{left: "2em"}} />
                </div>
              </div>
            </div>
        );
        expect(actual).to.equalJSX(expected);
    });

    it("Rendering component with different colors", function () {
        renderer.render(<Component
            bgChecked="#111"
            bgButton="#222"
            bgUnchecked="#333"
            colorChecked="#444"
            colorUnchecked="#555"
            checked={false}
            onChange={NOOP} />);
        const actual = renderer.getRenderOutput();
        const expected = (
            <div className="itsa-checkbox bordered"
              onBlur={function noRefCheck() {}}
              onClick={function noRefCheck() {}}
              onFocus={function noRefCheck() {}}
              onKeyPress={function noRefCheck() {}}
              style={{width: "4em"}}
              tabIndex={1}>
              <div className="itsa-checkbox-constrain" style={{left: "-2em", width: "6em"}}>
                <div className="itsa-checkbox-container" style={{left: "0"}}>
                  <div className="itsa-checkbox-on" style={{backgroundColor: "#111", color: "#444", width: "calc(4em - 2px)"}}>I</div>
                  <div className="itsa-checkbox-off" style={{backgroundColor: "#333", color: "#555", width: "calc(4em - 2px)"}}>O</div>
                  <div
                    className="itsa-checkbox-btn"
                    onMouseDown={function noRefCheck() {}}
                    onTouchEnd={function noRefCheck() {}}
                    onTouchMove={function noRefCheck() {}}
                    onTouchStart={function noRefCheck() {}}
                    style={{backgroundColor: "#222", left: "2em"}} />
                </div>
              </div>
            </div>
        );
        expect(actual).to.equalJSX(expected);
    });

    it("Rendering different sized component", function () {
        renderer.render(<Component fontSize="5em" checked={false} onChange={NOOP} />);
        const actual = renderer.getRenderOutput();
        const expected = (
            <div className="itsa-checkbox bordered"
              onBlur={function noRefCheck() {}}
              onClick={function noRefCheck() {}}
              onFocus={function noRefCheck() {}}
              onKeyPress={function noRefCheck() {}}
              style={{fontSize:"5em", width: "4em"}}
              tabIndex={1}>
              <div className="itsa-checkbox-constrain" style={{left: "-2em", width: "6em"}}>
                <div className="itsa-checkbox-container" style={{left: "0"}}>
                  <div className="itsa-checkbox-on" style={{width: "calc(4em - 2px)"}}>I</div>
                  <div className="itsa-checkbox-off" style={{width: "calc(4em - 2px)"}}>O</div>
                  <div
                    className="itsa-checkbox-btn"
                    onMouseDown={function noRefCheck() {}}
                    onTouchEnd={function noRefCheck() {}}
                    onTouchMove={function noRefCheck() {}}
                    onTouchStart={function noRefCheck() {}}
                    style={{left: "2em"}} />
                </div>
              </div>
            </div>
        );
        expect(actual).to.equalJSX(expected);
    });

    it("Rendering squared component", function () {
        renderer.render(<Component square={true} checked={false} onChange={NOOP} />);
        const actual = renderer.getRenderOutput();
        const expected = (
            <div className="itsa-checkbox"
              onBlur={function noRefCheck() {}}
              onClick={function noRefCheck() {}}
              onFocus={function noRefCheck() {}}
              onKeyPress={function noRefCheck() {}}
              style={{width: "4em"}}
              tabIndex={1}>
              <div className="itsa-checkbox-constrain" style={{left: "-2em", width: "6em"}}>
                <div className="itsa-checkbox-container" style={{left: "0"}}>
                  <div className="itsa-checkbox-on" style={{width: "calc(4em - 2px)"}}>I</div>
                  <div className="itsa-checkbox-off" style={{width: "calc(4em - 2px)"}}>O</div>
                  <div
                    className="itsa-checkbox-btn"
                    onMouseDown={function noRefCheck() {}}
                    onTouchEnd={function noRefCheck() {}}
                    onTouchMove={function noRefCheck() {}}
                    onTouchStart={function noRefCheck() {}}
                    style={{left: "2em"}} />
                </div>
              </div>
            </div>
        );
        expect(actual).to.equalJSX(expected);
    });

    it("Listening to checked-changes", function () {
        let checked = false;
        const handleChange = () => {
            checked = !checked;
        };
        const checkbox = TestUtils.renderIntoDocument(<Component checked={checked} onChange={handleChange} />);
        // const checkbox = React.renderComponent(<Component />, window.document.body);
        TestUtils.Simulate.click(ReactDOM.findDOMNode(checkbox));
        expect(checked).to.be.true;
    });

});
