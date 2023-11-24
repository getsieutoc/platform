import { useEditor, EditorContent, JSONContent } from '@tiptap/react';
import { Editor, Extensions } from '@tiptap/core';
import { useDebouncedCallback } from 'use-debounce';
import { EditorProps } from '@tiptap/pm/view';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';

import { EditorBubbleMenu } from './BubbleMenu';

export type TextEditorProps = {
  /**
   * The default value to use for the editor.
   * Defaults to defaultEditorContent.
   */
  content?: JSONContent | string;
  /**
   * A list of extensions to use for the editor, in addition to the default Novel extensions.
   * Defaults to [].
   */
  extensions?: Extensions;
  /**
   * Props to pass to the underlying Tiptap editor, in addition to the default Novel editor props.
   * Defaults to {}.
   */
  editorProps?: EditorProps;
  /**
   * A callback function that is called whenever the editor is updated.
   * Defaults to () => {}.
   */
  onUpdate?: (editor?: Editor) => void | Promise<void>;
  /**
   * A callback function that is called whenever the editor is updated, but only after the defined debounce duration.
   * Defaults to () => {}.
   */
  onDebouncedUpdate?: (editor?: Editor) => void | Promise<void>;
  /**
   * The duration (in milliseconds) to debounce the onDebouncedUpdate callback.
   * Defaults to 750.
   */
  debounceDuration?: number;
};

export const TextEditor = ({
  content: initialContent,
  extensions = [],
  editorProps = {},
  onUpdate,
  onDebouncedUpdate,
  debounceDuration = 100,
}: TextEditorProps) => {
  const [content, setContent] = useState(initialContent);

  const debouncedUpdates = useDebouncedCallback(
    async ({ editor }: { editor: Editor }) => {
      // const json = editor.getJSON();
      const text = editor.getText();

      if (typeof onDebouncedUpdate === 'function') {
        onDebouncedUpdate(editor);
      }

      setContent(text);
    },
    debounceDuration
  );

  const editor = useEditor({
    extensions: [StarterKit, ...extensions],
    editorProps: {
      attributes: {
        class: 'lakihelppi-text-editor',
      },
      handleDOMEvents: {
        keydown: (_view, event) => {
          // prevent default event listeners from firing when slash command is active
          if (['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
            return true;
          }
        },
      },
      ...editorProps,
    },
    content,
    onUpdate: (e) => {
      if (typeof onUpdate === 'function') {
        onUpdate(e.editor);
      }
      debouncedUpdates(e);
    },
  });

  useEffect(() => {
    if (!initialContent && content !== initialContent) {
      editor?.commands.clearContent();
    }
  }, [initialContent, content, editor]);

  return (
    <div onClick={() => editor?.chain().focus().run()}>
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};
