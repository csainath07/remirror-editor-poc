import { useState } from "react";
import { Button } from 'antd';
import { Editor } from './Editor/Editor';
import EditorPage from "./Editor/EditorPage";
import { CoverUploader } from './ui'
import { EMPTY_BLOCK } from "./utils/helperFunction";

import "remirror/styles/all.css";
import 'antd/dist/antd.variable.min.css';
import "./styles/variables.css";
import "./App.css";

export default function App() {
  const [details, setDetails] = useState({
    cover: '',
    title: '',
    shortDescription: "",
    blocks: [EMPTY_BLOCK()]
  });
  const [editable, setEditable] = useState(true);

  return (
    <div className="App">
      <div className="cover-photo">
        <CoverUploader editable={editable} />
      </div>
      <div className="title">
        <Editor
          placeholder="Untitled"
          initialContent={details.title}
          onChange={(value) => setDetails({ ...details, title: value })}
          singleLine
          formatting={false}
          editable={editable}
        />
      </div>
      <div className="short-description">
        <Editor
          placeholder="Short description"
          initialContent={details.shortDescription}
          onChange={(value) => setDetails({ ...details, shortDescription: value })}
          editable={editable}
        />
      </div>
      <EditorPage
        blocks={details.blocks}
        onChange={(updatedBlocks) => setDetails({
          ...details,
          blocks: updatedBlocks
        })}
        isDeleteOptionVisible={details.blocks.length > 1}
        editable={editable}
      />

      <div className={"actionButtons"}>
        <Button type="primary" onClick={() => setEditable(!editable)}>
          {
            editable ? 'Read Only' : 'Edit'
          }
        </Button>
      </div>
    </div>
  );
}

// for testing
// https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
// https://cdn.pixabay.com/photo/2021/10/07/15/12/wine-6688901_1280.jpg
// https://www.youtube.com/watch?v=oO9lLFZrWcQ
/*
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
*/
