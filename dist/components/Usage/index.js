"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _style = require("./style");

var _style2 = _interopRequireDefault(_style);

var _prismjs = require("prismjs");

var _prismjs2 = _interopRequireDefault(_prismjs);

var _prismLanguages = require("prism-languages");

var _prismLanguages2 = _interopRequireDefault(_prismLanguages);

require("prismjs/themes/prism.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Usage = function (_Component) {
    _inherits(Usage, _Component);

    function Usage() {
        _classCallCheck(this, Usage);

        return _possibleConstructorReturn(this, (Usage.__proto__ || Object.getPrototypeOf(Usage)).apply(this, arguments));
    }

    _createClass(Usage, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.storySource !== this.props.storySource;
        }
    }, {
        key: "render",
        value: function render() {
            var storySource = this.props.storySource;

            var html = _prismjs2.default.highlight(storySource, _prismLanguages2.default.jsx);
            return _react2.default.createElement(
                "pre",
                { style: _style2.default.wrapper },
                _react2.default.createElement("code", { className: "language-jsx",
                    dangerouslySetInnerHTML: { __html: html } })
            );
        }
    }]);

    return Usage;
}(_react.Component);

exports.default = Usage;