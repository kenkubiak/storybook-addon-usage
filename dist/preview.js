"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Usage = Usage;

var _storybookAddons = require("@kadira/storybook-addons");

var _storybookAddons2 = _interopRequireDefault(_storybookAddons);

var _2 = require("./");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Usage(fn) {
    var story = fn();
    var source = nodeToJSX(story);
    var channel = _storybookAddons2.default.getChannel();
    channel.emit(_2.EVENT_ID, { storybook: source });
    return story;
}

function nodeToJSX(node, indent) {
    indent = indent || '';
    if (typeof node === 'string') {
        return indent + node + '\n';
    }
    var moreIndent = indent + '    ';
    var tagname = node.type.displayName || node.type.name || node.type;
    var endTag = "</" + tagname + ">";
    var props = _lodash2.default.toPairs(node.props).filter(function (p) {
        return p[0] !== 'children';
    }).map(function (p) {
        return p[0] + '=' + valueToJSXAttr(p[1]);
    }).join('\n' + moreIndent);
    var childnodes = node.props.children || [];
    var children = (_lodash2.default.isArray(childnodes) ? childnodes : [childnodes]).map(function (child) {
        return nodeToJSX(child, moreIndent);
    }).join('');
    return indent + '<' + tagname + (props ? ' ' : '') + props + (children ? '>\n' + children + indent + endTag : '/>') + '\n';
}

function valueToJSXAttr(v) {
    var s = valueToJS(v, true);
    return typeof v === 'string' ? s : "{ " + s + " }";
}

function valueToJS(v, atTop) {
    // Like JSON.stringify but doesn't quote keys, shows function names,
    // and truncates long nested objects and arrays
    if (typeof v === 'function') {
        return v.name || 'function …';
    }
    if (_lodash2.default.isArray(v)) {
        return '[' + (atTop ? v.map(valueToJS).join(', ') : '…') + ']';
    }
    if (_lodash2.default.isObject(v)) {
        return '{' + (atTop ? Object.keys(v).map(function (key) {
            return key + ': ' + valueToJS(v[key]);
        }).join(', ') : '…') + '}';
    }
    if (typeof v === 'undefined') {
        return 'undefined';
    }
    return JSON.stringify(v);
}