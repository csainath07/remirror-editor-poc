import { CONTENT_TYPE } from "./constant";

export const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36);
};

export const EMPTY_BLOCK = (options) => {
  return {
    id: uid(),
    defaultTag: options?.tag || "p",
    type: options?.type || CONTENT_TYPE["HTML"],
    content: {
      html: "",
      imageEmbedUrl: "",
      videoEmbedUrl: "",
      bookmarkEmbedUrl: "",
      codeSnippet: {
        code: '',
        language: ''
      }
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

export const getCursorCoordinates = (boundedElementId = "") => {
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

    if (x === 0 && y === 0) {
      let elementCoordinates = document
        .getElementById(boundedElementId)
        .getBoundingClientRect();
      x = elementCoordinates.top;
      y = elementCoordinates.left;
    }
  }
  return { x, y };
};

export const getMouseClickCoordinates = (e) => {
  return {
    x: e?.clientX || null,
    y: e?.clientY || null,
  };
};

export const getActiveBlockIndex = (blocks = [], id = null) => {
  return blocks.findIndex((block) => block.id === id);
};

export const handleCommandPopupUnmount = (cb) => {
  const removeClickEvent = () => {
    console.log("called");
    cb?.();
    document.removeEventListener("click", removeClickEvent);
  };
  document.addEventListener("click", removeClickEvent);
};

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
