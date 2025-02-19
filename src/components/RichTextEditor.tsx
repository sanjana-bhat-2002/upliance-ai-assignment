import { useEffect, useState } from "react";
import classNames from "classnames";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";
import * as Icons from "./Icons";

const LOCAL_STORAGE_KEY = "users";

const getLastStoredUser = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const parsedData = JSON.parse(data);
      return parsedData.length > 0 ? parsedData[parsedData.length - 1] : null;
    }
  }
  return null;
};

const formatUserData = (user: {}) => {
  if (!user) return "<p>No data found</p>";
  return Object.entries(user)
    .map(
      ([key, value]) =>
        `<p><strong>${key.toUpperCase()}</strong>: ${value}</p>`,
    )
    .join("");
};

export default function RichTextEditor() {
  const [user, setUser] = useState(getLastStoredUser());

  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Link.configure({ openOnClick: false }),
      Bold,
      Underline,
      Italic,
      Strike,
      Code,
    ],
    content: formatUserData(user),
  }) as Editor;

  useEffect(() => {
    const handleStorageUpdate = () => {
      const newUser = getLastStoredUser();
      setUser(newUser);
      if (editor) {
        editor.commands.setContent(formatUserData(newUser));
      }
    };

    window.addEventListener("usersUpdated", handleStorageUpdate);
    return () =>
      window.removeEventListener("usersUpdated", handleStorageUpdate);
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="editor w-1/2">
      <div className="menu">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Icons.RotateLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Icons.RotateRight />
        </button>

        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("bold"),
          })}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Icons.Bold />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("underline"),
          })}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Icons.Underline />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("italic"),
          })}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Icons.Italic />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("strike"),
          })}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Icons.Strikethrough />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("code"),
          })}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Icons.Code />
        </button>
      </div>
      <br />
      <EditorContent editor={editor} />
    </div>
  );
}
