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
