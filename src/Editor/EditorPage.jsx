import { useState } from "react";
import CommandPopup from "./CommandPopup/CommandPopup";
import { Editor } from "./Editor";
import { CONTENT_TYPE } from "../utils/constant";
import {
  EMPTY_BLOCK,
  addNewBlocks,
  handleCommandPopupOpen,
  getActiveBlockIndex,
} from "../utils/helperFunction";

const EditorPage = ({
  placeholder = "Type '/' for commands",
  onChange = () => {},
  blocks = [],
}) => {
  const [commandPopup, setCommandPopup] = useState({
    isOpen: false,
    activeBlockId: null,
    position: {
      x: null,
      y: null,
    },
  });

  const updateBlocks = (block, index) => {
    let _blocks = [...blocks];
    _blocks[index] = { ...block };
    onChange(_blocks);
  };

  const handleCommandSelect = (command) => {
    switch (command.type) {
      case CONTENT_TYPE["HTML"]:
      default:
        const currentBlockIndex = getActiveBlockIndex(
          blocks,
          commandPopup.activeBlockId
        );
        insertNewBlock(currentBlockIndex, blocks, EMPTY_BLOCK(command.tag));
        break;
    }
  };

  const renderBlocks = (block, index) => {
    switch (block.type) {
      case CONTENT_TYPE["HTML"]:
      default:
        return (
          <Editor
            key={block.id}
            placeholder={placeholder}
            initialContent={block?.content?.html || ""}
            onChange={(newValue) =>
              updateBlocks(
                { ...block, content: { ...block.content, html: newValue } },
                index
              )
            }
            onEnter={() => {
              insertNewBlock(index, blocks, EMPTY_BLOCK());
            }}
            onCommand={({ blockId }) => {
              handleCommandPopupOpen(
                ({ x, y }) => {
                  setCommandPopup({
                    isOpen: true,
                    activeBlockId: blockId,
                    position: {
                      x,
                      y,
                    },
                  });
                },
                () => {
                  setCommandPopup({
                    isOpen: false,
                    position: {
                      x: null,
                      y: null,
                    },
                  });
                }
              );
            }}
            blockId={block?.id}
          />
        );
    }
  };

  const insertNewBlock = (
    currentBlockIndex = 0,
    blocks = [],
    newBlock = {}
  ) => {
    let _blocks = addNewBlocks({
      blocks: [...blocks],
      newBlock: newBlock,
      currentBlockIndex: currentBlockIndex,
    });
    onChange(_blocks);
  };

  return (
    <div className="editor-page-container">
      {blocks.map((block, index) => renderBlocks(block, index))}
      {commandPopup?.isOpen ? (
        <CommandPopup
          commandPopupPosition={commandPopup?.position}
          onCommandSelect={handleCommandSelect}
        />
      ) : null}
    </div>
  );
};

export default EditorPage;
