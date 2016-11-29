import addons from "@kadira/storybook-addons";
import {EVENT_ID} from "./";
import _ from "lodash";



export function Usage(fn) {
  let story = fn();
  let source = nodeToJSX(story);
  const channel = addons.getChannel();
  channel.emit(EVENT_ID, {storybook: source});
  return story;
}

function nodeToJSX (node, indent) {
    indent = indent || '';
    if (typeof node === 'string') {
        return indent + node + '\n';
    }
    let moreIndent = indent + '    ';
    let tagname = node.type.displayName || node.type.name || node.type;
    let endTag = `</${tagname}>`;
    let props = _.toPairs(node.props)
        .filter((p) => p[0] !== 'children')
        .map((p) => p[0] + '=' + valueToJSXAttr(p[1]))
        .join('\n' + moreIndent);
    let childnodes = node.props.children || [];
    let children = (_.isArray(childnodes) ? childnodes : [childnodes])
        .map((child) => nodeToJSX(child, moreIndent))
        .join('');
    return indent + '<' + tagname + (props ? ' ' : '') +
        props +
        (children ? '>\n' + children + indent + endTag : '/>') +
        '\n';
}

function valueToJSXAttr (v) {
    let s = valueToJS(v, true);
    return (typeof v === 'string') ? s : `{ ${s} }`;
}

function valueToJS (v, atTop) {
    // Like JSON.stringify but doesn't quote keys, shows function names,
    // and truncates long nested objects and arrays
    if (typeof v === 'function') {
        return v.name || 'function …';
    }
    if (_.isArray(v)) {
        return '[' + (atTop ?
            v.map( valueToJS ).join(', ') : '…') + ']';
    }
    if (_.isObject(v)) {
        return '{' + (atTop ? Object.keys(v)
            .map( (key) => key + ': ' + valueToJS(v[key]) )
            .join(', ') : '…') + '}';
    }
    if (typeof v === 'undefined' ) {
        return 'undefined';
    }
    return JSON.stringify(v);
}
