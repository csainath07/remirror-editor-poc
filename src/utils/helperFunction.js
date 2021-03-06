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
      audioEmbedUrl: "",
      bookmarkEmbedUrl: "",
      codeSnippet: {
        code: '',
        language: ''
      },
      uploadedFile: ''
    },
  };
};

export const DUMMY_BLOCKS = () => {
  return [{
    id: uid(),
    defaultTag: "p",
    type: CONTENT_TYPE["HTML"],
    content: {
      html: "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
      imageEmbedUrl: "",
      videoEmbedUrl: "",
      bookmarkEmbedUrl: "",
      codeSnippet: {
        code: '',
        language: ''
      },
      uploadedFile: ''
    },
  },
  {
    id: uid(),
    defaultTag: "p",
    type: CONTENT_TYPE["CODE_SNIPPET"],
    content: {
      html: "",
      imageEmbedUrl: "",
      videoEmbedUrl: "",
      bookmarkEmbedUrl: "",
      codeSnippet: {
        code: 'console.log("Hello World");',
        language: 'jsx'
      },
      uploadedFile: ''
    },
  },
  {
    id: uid(),
    defaultTag: "p",
    type: CONTENT_TYPE["Image"],
    content: {
      html: "",
      imageEmbedUrl: "https://cdn.pixabay.com/photo/2021/10/07/15/12/wine-6688901_1280.jpg",
      videoEmbedUrl: "",
      bookmarkEmbedUrl: "",
      codeSnippet: {
        code: '',
        language: ''
      },
      uploadedFile: ''
    },
  },
  {
    id: uid(),
    defaultTag: "p",
    type: CONTENT_TYPE["VIDEO"],
    content: {
      html: "",
      imageEmbedUrl: "",
      videoEmbedUrl: "https://www.youtube.com/watch?v=oO9lLFZrWcQ",
      bookmarkEmbedUrl: "",
      codeSnippet: {
        code: '',
        language: ''
      },
      uploadedFile: ''
    },
  },
  {
    id: uid(),
    defaultTag: "p",
    type: CONTENT_TYPE["AUDIO"],
    content: {
      html: "",
      imageEmbedUrl: "",
      videoEmbedUrl: "",
      audioEmbedUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      bookmarkEmbedUrl: "",
      codeSnippet: {
        code: '',
        language: ''
      },
      uploadedFile: ''
    },
  },
  {
    id: uid(),
    defaultTag: "p",
    type: CONTENT_TYPE["BOOKMARK"],
    content: {
      html: "",
      imageEmbedUrl: "",
      videoEmbedUrl: "",
      bookmarkEmbedUrl: "https://www.google.com",
      codeSnippet: {
        code: '',
        language: ''
      },
      uploadedFile: ''
    },
  }
]
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

export const fileSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]}`
  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}