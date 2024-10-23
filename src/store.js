import { configureStore, createSlice } from '@reduxjs/toolkit';

const markdownSlice = createSlice({
  name: 'markdown',
  initialState: {
    content: `# Welcome to my Markdown Previewer!
    
## This is a sub-heading...
### And here's some other cool stuff:

Here's some code, \`<div></div>\`, between 2 backticks.

\`\`\`javascript
// this is multi-line code:
function example(firstLine, lastLine) {
  if (firstLine === '\`\`\`' && lastLine === '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`,
  },
  reducers: {
    updateMarkdown: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { updateMarkdown } = markdownSlice.actions;
export const markdownReducer = markdownSlice.reducer;

export const store = configureStore({
  reducer: {
    markdown: markdownReducer,
  },
});
