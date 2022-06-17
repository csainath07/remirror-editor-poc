import { Type, Image, Film, Volume2, Bookmark } from "react-feather";
import { CONTENT_TYPE } from "../../utils/constant";
import Styles from "./_.module.css";

/** Commands */
const COMMANDS = {
  text: {
    title: "Basics",
    options: [
      {
        id: "command-basic_p",
        icon: <Type size={20} />,
        label: "Normal Text",
        subText: "Just start writing with pain text",
        tag: "p",
        type: CONTENT_TYPE["HTML"],
      },
    ],
  },
  media: {
    title: "Media",
    options: [
      {
        id: "command-media_img",
        icon: <Image size={20} />,
        label: "Image",
        subText: "Upload or Embed with link",
        tag: "div",
        type: CONTENT_TYPE["IMAGE"],
      },
      {
        id: "command-media_video",
        icon: <Film size={20} />,
        label: "Video",
        subText: "Upload or Embed with link",
        tag: "div",
        type: CONTENT_TYPE["VIDEO"],
      },
      {
        id: "command-media_audio",
        icon: <Volume2 size={20} />,
        label: "Audio",
        subText: "Upload or Embed with link",
        tag: "div",
        type: CONTENT_TYPE["AUDIO"],
      },
      {
        id: "command-media_bookmark",
        icon: <Bookmark size={20} />,
        label: "Bookmark Web Url",
        subText: "Bookmark web url",
        tag: "div",
        type: CONTENT_TYPE["BOOKMARK"],
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
