import { memo } from "react";
import {
  useActive,
  useChainedCommands,
  FloatingWrapper,
} from "@remirror/react";
import { Bold, Italic, Underline, Type, AlignCenter, AlignLeft, AlignRight, Code } from "react-feather";
import { Button, Dropdown, Menu } from "antd";

import Styles from "./Editor.module.css";

const Menus = (props) => {
  const active = useActive();
  const chain = useChainedCommands();

  const menu = (
    <Menu
      className={Styles.headingMenus}
      items={[
        {
          key: "1",
          label: (
            <Button
              onClick={() => {
                chain.toggleHeading({ level: 1 }).focus().run();
              }}
              style={{
                background: active.bold() ? "#ff4856" : undefined,
                color: active.bold() ? "#fff" : undefined,
              }}
            >
              Heading 1
            </Button>
          ),
        },
        {
          key: "2",
          label: (
            <Button
              onClick={() => {
                chain.toggleHeading({ level: 2 }).focus().run();
              }}
              style={{
                background: active.bold() ? "#ff4856" : undefined,
                color: active.bold() ? "#fff" : undefined,
              }}
            >
              Heading 2
            </Button>
          ),
        },
        {
          key: "3",
          label: (
            <Button
              onClick={() => {
                chain.toggleHeading({ level: 3 }).focus().run();
              }}
              style={{
                background: active.bold() ? "#ff4856" : undefined,
                color: active.bold() ? "#fff" : undefined,
              }}
            >
              Heading 3
            </Button>
          ),
        },
      ]}
    />
  );

  return (
    <FloatingWrapper positioner={props.positioner} placement="top">
      <Dropdown overlay={menu} placement="bottom" arrow>
        <Button>
          <Type size={16} />
        </Button>
      </Dropdown>
      <Button
        onClick={() => {
          chain.toggleBold().focus().run();
        }}
        style={{
          background: active.bold() ? "#ff4856" : undefined,
          color: active.bold() ? "#fff" : undefined,
        }}
      >
        <Bold size={16} />
      </Button>
      <Button
        onClick={() => {
          chain.toggleItalic().focus().run();
        }}
        style={{
          background: active.italic() ? "#ff4856" : undefined,
          color: active.italic() ? "#fff" : undefined,
        }}
      >
        <Italic size={16} />
      </Button>
      <Button
        onClick={() => {
          chain.toggleUnderline().focus().run();
        }}
        style={{
          background: active.underline() ? "#ff4856" : undefined,
          color: active.underline() ? "#fff" : undefined,
        }}
      >
        <Underline size={16} />
      </Button>
      <Button
        onClick={() => {
          chain.toggleCode().focus().run();
        }}
        style={{
          background: active.code() ? "#ff4856" : undefined,
          color: active.code() ? "#fff" : undefined,
        }}
      >
        <Code size={16} />
      </Button>
      <Button
        onClick={() => {
          chain.centerAlign().focus().run();
        }}
      >
        <AlignCenter size={16} />
      </Button>
      <Button
        onClick={() => {
          chain.leftAlign().focus().run();
        }}
      >
        <AlignLeft size={16} />
      </Button>
      <Button
        onClick={() => {
          chain.rightAlign().focus().run();
        }}
      >
        <AlignRight size={16} />
      </Button>
    </FloatingWrapper>
  );
};

export default memo(Menus);
