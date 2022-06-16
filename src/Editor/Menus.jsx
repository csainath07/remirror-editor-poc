import {
  useActive,
  useChainedCommands,
  FloatingWrapper,
} from "@remirror/react";
import { useEffect } from "react";

export const Menus = (props) => {
  const active = useActive();
  const chain = useChainedCommands();

  useEffect(() => {
    switch (props.defaultTag) {
      case "h1":
        chain?.toggleHeading({ level: 1 })?.focus()?.run();
        break;
      case "h2":
        chain?.toggleHeading({ level: 2 })?.focus()?.run();
        break;
      case "h3":
        chain?.toggleHeading({ level: 3 })?.focus()?.run();
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.defaultTag]);

  return (
    <FloatingWrapper positioner={props.positioner} placement="top">
      <button
        onClick={() => {
          chain.toggleBold().focus().run();
        }}
        style={{ fontWeight: active.bold() ? "bold" : undefined }}
      >
        B
      </button>
      <button
        onClick={() => {
          chain.toggleItalic().focus().run();
        }}
        style={{ fontWeight: active.italic() ? "bold" : undefined }}
      >
        I
      </button>
      <button
        onClick={() => {
          chain.toggleUnderline().focus().run();
        }}
        style={{ fontWeight: active.underline() ? "bold" : undefined }}
      >
        <u>U</u>
      </button>
    </FloatingWrapper>
  );
};
