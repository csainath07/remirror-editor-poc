import { CONTENT_TYPE } from "./constant";

export const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36);
};

export const EMPTY_BLOCK = (tag = "p") => {
  return {
    id: uid(),
    defaultTag: tag || "p",
    type: CONTENT_TYPE["HTML"],
    content: {
      html: "",
    },
  };
};

export const addNewBlocks = ({
  blocks = [],
  currentBlockIndex = 0,
  addExtraBlock = false,
  newBlock = EMPTY_BLOCK(),
}) => {
  const _blocks = [...blocks];
  if (currentBlockIndex !== -1) {
    _blocks.splice(currentBlockIndex + 1, 0, newBlock);

    if (addExtraBlock) {
      _blocks.splice(currentBlockIndex + 2, 0, EMPTY_BLOCK());
    }
  }

  return _blocks;
};

export const getCursorCoordinates = () => {
  let x = 0;
  let y = 0;
  const selection = window.getSelection();
  if (selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0).cloneRange();
    range.collapse(false);
    const rect = range.getClientRects()[0];
    if (rect) {
      x = rect.top;
      y = rect.left;
    }
  }
  return { x, y };
};

export const getActiveBlockIndex = (blocks = [], id = null) => {
  return blocks.findIndex((block) => block.id === id);
};

export const handleCommandPopupOpen = (cb, unMountCb) => {
  const { x, y } = getCursorCoordinates();
  cb?.({ x, y });
  document.addEventListener("click", () => {
    unMountCb?.();
    document.removeEventListener("click", handleCommandPopupOpen);
  });
};
