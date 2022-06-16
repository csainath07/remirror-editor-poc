import { Editor } from "./Editor";
import { CONTENT_TYPE } from "../utils/constant";
import { EMPTY_BLOCK } from "../utils/helperFunction";

const EditorPage = ({
  placeholder = "Type '/' for commands",
  onChange = () => {},
  blocks = [],
}) => {
  const updateBlocks = (block, index) => {
    let _blocks = [...blocks];
    _blocks[index] = { ...block };
    onChange(_blocks);
  };

  const renderBlocks = (block, index) => {
    switch (block.type) {
      case CONTENT_TYPE["HTML"]:
      default:
        return (
          <Editor
            key={index}
            placeholder={placeholder}
            initialContent={block?.content?.html || ""}
            onChange={(newValue) =>
              updateBlocks(
                { ...block, content: { ...block.content, html: newValue } },
                index
              )
            }
            onEnter={() => {
              updateBlocks(EMPTY_BLOCK(), index + 1);
            }}
          />
        );
    }
  };

  return (
    <div className="editor-page-container">
      {blocks.map((block, index) => renderBlocks(block, index))}
    </div>
  );
};

export default EditorPage;
