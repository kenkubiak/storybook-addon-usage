import React, {Component, PropTypes} from "react";
import style from "./style";
import Prism from 'prismjs';
import languages from 'prism-languages';
import 'prismjs/themes/prism.css';

export default class Usage extends Component {

  shouldComponentUpdate (nextProps) {
      return nextProps.storySource !== this.props.storySource;
  }

  render() {
    let {storySource} = this.props;
    let html = Prism.highlight(storySource, languages.jsx);
    return (
        <pre style={style.wrapper}>
            <code className="language-jsx"
                dangerouslySetInnerHTML={{__html: html}}>
            </code>
        </pre>
    );
  }
}
