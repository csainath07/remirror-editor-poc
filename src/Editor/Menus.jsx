import {
  useActive,
  useChainedCommands,
  FloatingWrapper,
} from "@remirror/react";

export const Menus = (props) => {
  const active = useActive();
  const chain = useChainedCommands();

  return (
    <FloatingWrapper positioner={props.positioner} placement="bottom">
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
