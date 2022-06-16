import {
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
  selectionPositioner,
  PlaceholderExtension,
  HeadingExtension,
} from "remirror/extensions";
import {
  useRemirror,
  Remirror,
  EditorComponent,
  useEvent,
  useKeymap,
} from "@remirror/react";
import { prosemirrorNodeToHtml } from "remirror";
import { Menus } from "./Menus";

const hooks = ({ event }) => [
  () => {
    useEvent("keyup", event.keyUp);
  },
  () => {
    useKeymap("Enter", (e) => {
      event?.enter();
      return true;
    });
  },
  () => {
    useKeymap("Shift-Enter", (e) => false);
  },
];

export const Editor = ({
  placeholder = "Write here...",
  onChange = () => {},
  onKeyUp = () => {},
  onEnter = () => {},
  initialContent = "",
  editable = true,
  defaultTag = "p",
  ...rest
}) => {
  const { manager, state, setState } = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new ItalicExtension(),
      new UnderlineExtension(),
      new HeadingExtension(),
      new PlaceholderExtension({ placeholder }),
    ],
    content: initialContent,
    selection: "end",
    stringHandler: "html",
  });

  return (
    <div className="remirror-theme">
      <Remirror
        editable={editable}
        manager={manager}
        state={state}
        onChange={(parameter) => {
          if (parameter.tr?.docChanged) {
            onChange?.(prosemirrorNodeToHtml(parameter.state.doc));
          }
          setState(parameter.state);
        }}
        hooks={hooks({
          event: {
            keyUp: onKeyUp,
            enter: onEnter,
          },
        })}
        autoFocus={true}
        {...rest}
      >
        <Menus positioner={selectionPositioner} defaultTag={defaultTag} />
        <EditorComponent />
      </Remirror>
    </div>
  );
};
