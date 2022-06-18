import { useState } from "react";
import EditorPage from "./Editor/EditorPage";
import { EMPTY_BLOCK } from "./utils/helperFunction";

import "remirror/styles/all.css";
import "./App.css";

export default function App() {
  const [blocks, setBlocks] = useState([EMPTY_BLOCK()]);

  return (
    <div className="App">
      <EditorPage
        blocks={blocks}
        onChange={(updatedBlocks) => setBlocks(updatedBlocks)}
        isDeleteOptionVisible={blocks.length > 1}
      />
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
