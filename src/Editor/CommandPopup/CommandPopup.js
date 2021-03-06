import { RiText, RiTerminalLine, RiImageLine, RiMicLine, RiMovieLine, RiBookmarkLine, RiAttachmentLine } from "react-icons/ri";
import { CONTENT_TYPE } from "../../utils/constant";
import Styles from "./_.module.css";

/** Commands */
const COMMANDS = {
  text: {
    title: "Basics",
    options: [
      {
        id: "command-basic_p",
        icon: <RiText size={20} />,
        label: "Normal Text",
        subText: "Just start writing with pain text",
        tag: "p",
        type: CONTENT_TYPE["HTML"],
      },
    ],
  },
  code: {
    title: "Code",
    options: [
      {
        id: "command-basic_code",
        icon: <RiTerminalLine size={20} />,
        label: "Code Snippet",
        subText: "Capture a code snippet",
        tag: "code",
        type: CONTENT_TYPE["CODE_SNIPPET"],
      },
    ],
  },
  media: {
    title: "Media",
    options: [
      {
        id: "command-media_img",
        icon: <RiImageLine size={20} />,
        label: "Image",
        subText: "Upload or Embed with link",
        tag: "div",
        type: CONTENT_TYPE["IMAGE"],
      },
      {
        id: "command-media_video",
        icon: <RiMovieLine size={20} />,
        label: "Video",
        subText: "Upload or Embed with link",
        tag: "div",
        type: CONTENT_TYPE["VIDEO"],
      },
      {
        id: "command-media_audio",
        icon: <RiMicLine size={20} />,
        label: "Audio",
        subText: "Upload or Embed with link",
        tag: "div",
        type: CONTENT_TYPE["AUDIO"],
      },
      {
        id: "command-media_bookmark",
        icon: <RiBookmarkLine size={20} />,
        label: "Bookmark Web Url",
        subText: "Bookmark web url",
        tag: "div",
        type: CONTENT_TYPE["BOOKMARK"],
      },
      {
        id: "command-media_attachments",
        icon: <RiAttachmentLine size={20} />,
        label: "File",
        subText: "Upload File",
        tag: "div",
        type: CONTENT_TYPE["FILE"],
      },
    ],
  },
};

const CommandPopup = ({ commandPopupPosition, onCommandSelect }) => {
  const renderOptions = (options) => {
    return options.map((command) => (
      <dd
        key={command.id}
        tabIndex="0"
        role="button"
        onClick={() => onCommandSelect(command)}
      >
        <div className={Styles.commandIcon}>{command.icon}</div>
        <div className={Styles.commandInfo}>
          <span>{command.label}</span>
          <p>{command.subText}</p>
        </div>
      </dd>
    ));
  };

  return (
    <div
      className={Styles.commandPopupContainer}
      style={{
        top: commandPopupPosition.x,
        left: commandPopupPosition.y,
      }}
      tabIndex="0"
      id="commandPopup"
    >
      <dl>
        {Object.keys(COMMANDS).map((key) => {
          return (
            <div key={key}>
              <dt>{COMMANDS[key]["title"]}</dt>
              {renderOptions(COMMANDS[key]["options"])}
            </div>
          );
        })}
      </dl>
    </div>
  );
};

export default CommandPopup;
