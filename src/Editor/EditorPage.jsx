import { useState, useEffect } from "react";
import { Plus, Trash2 } from "react-feather";
import CommandPopup from "./CommandPopup/CommandPopup";
import { Editor } from "./Editor";
import { ImageBlock, VideoBlock, AudioBlock } from "./MediaBlocks";
import { CONTENT_TYPE } from "../utils/constant";
import {
  EMPTY_BLOCK,
  addNewBlocks,
  getActiveBlockIndex,
  getCursorCoordinates,
  getMouseClickCoordinates,
} from "../utils/helperFunction";

import Styles from "./Editor.module.css";

const EditorPage = ({
  placeholder = "Type '/' for commands",
  onChange = () => {},
  blocks = [],
  isDeleteOptionVisible = false,
}) => {
  const [commandPopup, setCommandPopup] = useState({
    isOpen: false,
    activeBlockId: null,
    position: {
      x: null,
      y: null,
    },
  });

  useEffect(
    function toggleCommandPopup() {
      const popup = document.getElementById("commandPopup");
      if (commandPopup.isOpen) {
        popup?.focus();
        popup?.addEventListener("blur", () => {
          setTimeout(() => {
            setCommandPopup({
              isOpen: false,
              position: {
                x: null,
                y: null,
              },
            });
          }, 10);
        });
      } else {
        popup?.removeEventListener("blur", () => {
          setTimeout(() => {
            setCommandPopup({
              isOpen: false,
              position: {
                x: null,
                y: null,
              },
            });
          }, 10);
        });
      }
    },
    [commandPopup.isOpen]
  );

  const updateBlocks = (block, index) => {
    let _blocks = [...blocks];
    _blocks[index] = { ...block };
    onChange(_blocks);
  };

  const handleCommandSelect = (command) => {
    const currentBlockIndex = getActiveBlockIndex(
      blocks,
      commandPopup.activeBlockId
    );

    switch (command.type) {
      case CONTENT_TYPE["IMAGE"]:
      case CONTENT_TYPE["VIDEO"]:
      case CONTENT_TYPE["AUDIO"]:
        insertNewBlock(
          currentBlockIndex,
          blocks,
          EMPTY_BLOCK({ tag: command.tag, type: command.type }),
          true
        );
        break;
      case CONTENT_TYPE["HTML"]:
      default:
        insertNewBlock(
          currentBlockIndex,
          blocks,
          EMPTY_BLOCK({ tag: command.tag })
        );
        break;
    }
  };

  const handleCommandPopup = ({ blockId, x, y }) => {
    setCommandPopup({
      isOpen: true,
      activeBlockId: blockId,
      position: {
        x,
        y,
      },
    });
  };

  const renderBlocks = (block, index) => {
    switch (block.type) {
      case CONTENT_TYPE["IMAGE"]:
        return (
          <ImageBlock
            data={block}
            onEmbedLinkSubmit={({ key, embedLink }) => {
              updateBlocks(
                { ...block, content: { ...block.content, [key]: embedLink } },
                index
              );
            }}
          />
        );
      case CONTENT_TYPE["VIDEO"]:
        return (
          <VideoBlock
            data={block}
            onEmbedLinkSubmit={({ key, embedLink }) => {
              updateBlocks(
                { ...block, content: { ...block.content, [key]: embedLink } },
                index
              );
            }}
          />
        );
      case CONTENT_TYPE["AUDIO"]:
        return (
          <AudioBlock
            data={block}
            onEmbedLinkSubmit={({ key, embedLink }) => {
              updateBlocks(
                { ...block, content: { ...block.content, [key]: embedLink } },
                index
              );
            }}
          />
        );
      case CONTENT_TYPE["HTML"]:
      default:
        return (
          <Editor
            key={block.id}
            id={block.id}
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
              const { x, y } = getCursorCoordinates(blockId);
              handleCommandPopup({ blockId, x, y });
            }}
            blockId={block?.id}
          />
        );
    }
  };

  const insertNewBlock = (
    currentBlockIndex = 0,
    blocks = [],
    newBlock = {},
    addExtraBlock = false
  ) => {
    let _blocks = addNewBlocks({
      blocks: [...blocks],
      newBlock: newBlock,
      currentBlockIndex: currentBlockIndex,
      addExtraBlock,
    });
    onChange(_blocks);
  };

  const deleteBlock = (deleteBlockId) => {
    const _blocks = blocks.filter((block) => block.id !== deleteBlockId);
    onChange(_blocks);
  };

  return (
    <div className="editor-page-container">
      {blocks.map((block, index) => (
        <div className={Styles.editableBlockContainer} key={block.id}>
          <div className={Styles.blockOptions}>
            <Plus
              size={16}
              className={Styles.addBlockIcon}
              onClick={(e) => {
                const { x, y } = getMouseClickCoordinates(e);
                handleCommandPopup({
                  blockId: block.id,
                  x: y + 10,
                  y: x + 10,
                });
              }}
            />
            {isDeleteOptionVisible ? (
              <Trash2
                size={16}
                className={Styles.removeBlockIcon}
                onClick={() => deleteBlock(block.id)}
              />
            ) : null}
          </div>
          <div className={Styles.contentBlockContainer}>
            {/* Render different type of content block */}
            {renderBlocks(block, index)}
          </div>
        </div>
      ))}

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
