import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMarkdown } from './store';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import './App.css';

marked.setOptions({
  breaks: true,
  highlight: function (code, lang) {
    if (Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    }
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  },
});

function App() {
  const markdown = useSelector((state) => state.markdown.content);
  const dispatch = useDispatch();

  const [editorMaximized, setEditorMaximized] = useState(false);
  const [previewMaximized, setPreviewMaximized] = useState(false);

  const handleChange = (e) => {
    dispatch(updateMarkdown(e.target.value));
  };

  const handleEditorMaximize = () => {
    setEditorMaximized(!editorMaximized);
  };

  const handlePreviewMaximize = () => {
    setPreviewMaximized(!previewMaximized);
  };

  const classNames = editorMaximized
    ? ['editorWrap maximized', 'previewWrap hide']
    : previewMaximized
    ? ['editorWrap hide', 'previewWrap maximized']
    : ['editorWrap', 'previewWrap'];

  useEffect(() => {
    Prism.highlightAll();
  }, [markdown]);

  return (
    <div className="App">
      <h1 className="text-center mb-3">Markdown Previewer</h1>

      <div className={classNames[0]}>
        <div className="toolbar">
          <span>Editor</span>
          <i
            className={`fas ${
              editorMaximized ? 'fa-compress' : 'fa-arrows-alt'
            }`}
            onClick={handleEditorMaximize}
          />
        </div>
        <textarea id="editor" value={markdown} onChange={handleChange} />
      </div>

      <div className={classNames[1]}>
        <div className="toolbar">
          <span>Preview</span>
          <i
            className={`fas ${
              previewMaximized ? 'fa-compress' : 'fa-arrows-alt'
            }`}
            onClick={handlePreviewMaximize}
          />
        </div>
        <div
          id="preview"
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        />
      </div>
    </div>
  );
}

export default App;
