import {
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
  selectionPositioner,
  PlaceholderExtension,
  HeadingExtension,
  HardBreakExtension,
} from "remirror/extensions";
import {
  useRemirror,
  Remirror,
  useKeymaps,
  useRemirrorContext,
  useChainedCommands,
} from "@remirror/react";

import { prosemirrorNodeToHtml } from "remirror";
import { Menus } from "./Menus";

export const Editor = ({
  placeholder = "Write here...",
  onChange = () => {},
  onKeyUp = () => {},
  onEnter = () => {},
  onCommand = () => {},
  initialContent = "",
  editable = true,
  blockId = null,
  ...rest
}) => {
  const { manager, state, setState } = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new ItalicExtension(),
      new UnderlineExtension(),
      new HeadingExtension(),
      new HardBreakExtension(),
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
        autoFocus={true}
        {...rest}
      >
        <Menus positioner={selectionPositioner} />
        <EditorBindings
          events={{
            keyUp: onKeyUp,
            enter: onEnter,
            command: onCommand,
          }}
          blockId={blockId}
        />
      </Remirror>
    </div>
  );
};

// Handling Keyboard Events
export const EditorBindings = ({ events, blockId }) => {
  const { getRootProps } = useRemirrorContext({ autoUpdate: false });
  const chain = useChainedCommands();

  useKeymaps({
    Enter: () => {
      events?.enter?.();
      return true;
    },
    "Shift-Enter": () => {
      chain?.insertHardBreak().focus().run();
      return true;
    },
    "/": () => {
      events?.command?.({ blockId });
      return true;
    },
  });

  return <div {...getRootProps()} />;
};
