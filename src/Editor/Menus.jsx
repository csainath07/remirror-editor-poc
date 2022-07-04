import { memo } from "react";
import {
  useActive,
  useChainedCommands,
  FloatingWrapper,
} from "@remirror/react";
import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiText,
  RiCodeLine,
  RiAlignCenter,
  RiAlignLeft,
  RiAlignRight,
  RiStrikethrough,
  RiH1,
  RiH2,
  RiH3,
  RiListOrdered,
  RiListUnordered,
  RiListCheck,
} from "react-icons/ri";
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
              <RiH1 size={16} />
              &nbsp; Heading 1
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
              <RiH2 size={16} />
              &nbsp; Heading 2
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
              <RiH3 size={16} />
              &nbsp; Heading 3
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
          <RiText size={16} />
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
        <RiBold size={16} />
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
        <RiItalic size={16} />
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
        <RiUnderline size={16} />
      </Button>
      <Button
        onClick={() => {
          chain.toggleStrike().focus().run();
        }}
        style={{
          background: active.strike() ? "#ff4856" : undefined,
          color: active.strike() ? "#fff" : undefined,
        }}
      >
        <RiStrikethrough size={16} />
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
        <RiCodeLine size={16} />
      </Button>
      <Button
        onClick={() => {
          chain.centerAlign().focus().run();
        }}
      >
        <RiAlignCenter size={16} />
      </Button>
      <Button
        onClick={() => {
          chain.leftAlign().focus().run();
        }}
      >
        <RiAlignLeft size={16} />
      </Button>
      <Button
        onClick={() => {
          chain.rightAlign().focus().run();
        }}
      >
        <RiAlignRight size={16} />
      </Button>
      <Button
        onClick={() => {
          chain.toggleBulletList().focus().run();
        }}
        style={{
          background: active.bulletList() ? "#ff4856" : undefined,
          color: active.bulletList() ? "#fff" : undefined,
        }}
      >
        <RiListUnordered size={16} />
      </Button>
      <Button
        onClick={() => {
          chain.toggleOrderedList().focus().run();
        }}
        style={{
          background: active.orderedList() ? "#ff4856" : undefined,
          color: active.orderedList() ? "#fff" : undefined,
        }}
      >
        <RiListOrdered size={16} />
      </Button>
      <Button
        onClick={() => {
          chain.toggleTaskList().focus().run();
        }}
        style={{
          background: active.taskList() ? "#ff4856" : undefined,
          color: active.taskList() ? "#fff" : undefined,
        }}
      >
        <RiListCheck size={16} />
      </Button>
    </FloatingWrapper>
  );
};

export default memo(Menus);
