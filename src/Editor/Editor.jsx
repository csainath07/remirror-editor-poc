import {
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
  selectionPositioner,
  PlaceholderExtension,
  HeadingExtension,
  NodeFormattingExtension,
  HardBreakExtension,
  CodeExtension,
  BlockquoteExtension,
  BulletListExtension,
  LinkExtension,
  OrderedListExtension,
  TaskListExtension,
  StrikeExtension
} from "remirror/extensions";
import {
  useRemirror,
  Remirror,
  useKeymaps,
  useRemirrorContext,
  useChainedCommands
} from "@remirror/react";

import { prosemirrorNodeToHtml } from "remirror";
import Menus from "./Menus";

export const Editor = ({
  placeholder = "Write here...",
  onChange = () => {},
  onKeyUp = () => {},
  onEnter = () => {},
  onCommand = () => {},
  initialContent = "",
  editable = true,
  blockId = null,
  id = "",
  singleLine = false,
  formatting = true,
  defaultTag = "p",
  ...rest
}) => {
  const { manager, state, setState } = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new ItalicExtension(),
      new UnderlineExtension(),
      new HeadingExtension(),
      new HardBreakExtension(),
      new NodeFormattingExtension(),
      new CodeExtension(),
      new BlockquoteExtension(),
      new StrikeExtension(),
      new BulletListExtension(),
      new LinkExtension({ autoLink: true }),
      new OrderedListExtension(),
      new TaskListExtension(),
      new PlaceholderExtension({ placeholder }),
    ],
    builtin: { persistentSelectionClass: 'selection' },
    content: initialContent,
    selection: "end",
    stringHandler: "html",
  });

  return (
    <div className="remirror-theme" id={id}>
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
        {formatting ? (
          <Menus defaultTag={defaultTag} positioner={selectionPositioner} />
        ) : null}
        <EditorBindings
          events={{
            keyUp: onKeyUp,
            enter: onEnter,
            command: onCommand,
          }}
          blockId={blockId}
          singleLine={singleLine}
        />
      </Remirror>
    </div>
  );
};

// Handling Keyboard Events
export const EditorBindings = ({ events, blockId, singleLine }) => {
  const { getRootProps } = useRemirrorContext({ autoUpdate: false });
  const chain = useChainedCommands();

  useKeymaps({
    "Alt-n": () => {
      events?.enter?.();
      return true;
    },
    "Shift-Enter": () => {
      if (!singleLine) {
        chain?.insertHardBreak().focus().run();
      }
      return true;
    },
    "mod-/": () => {
      events?.command?.({ blockId });
      return true;
    },
  });

  return <div {...getRootProps()} />;
};
