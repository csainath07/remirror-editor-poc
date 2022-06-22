import { memo } from "react";
import {
  useActive,
  useChainedCommands,
  FloatingWrapper
} from "@remirror/react";
import { Bold, Italic, Underline } from "react-feather";

const Menus = (props) => {
  const active = useActive();
  const chain = useChainedCommands();

  return (
    <FloatingWrapper positioner={props.positioner} placement="top">
      <button
        onClick={() => {
          chain.toggleBold().focus().run();
        }}
        style={{
          background: active.bold() ? "#ff4856" : undefined,
          color: active.bold() ? "#fff" : undefined,
        }}
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => {
          chain.toggleItalic().focus().run();
        }}
        style={{
          background: active.italic() ? "#ff4856" : undefined,
          color: active.italic() ? "#fff" : undefined,
        }}
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => {
          chain.toggleUnderline().focus().run();
        }}
        style={{
          background: active.underline() ? "#ff4856" : undefined,
          color: active.underline() ? "#fff" : undefined,
        }}
      >
        <Underline size={16} />
      </button>
    </FloatingWrapper>
  );
};

export default memo(Menus)