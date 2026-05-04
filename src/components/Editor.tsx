'use client';

import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import { useEffect } from 'react';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Link as LinkIcon, 
  Code, Heading1, Heading2, List, ListOrdered, Quote, Image as ImageIcon, 
  Youtube as YoutubeIcon, Unlink 
} from 'lucide-react';

export default function Editor({ value, onChange, placeholder = 'Write your story...' }: { value: string, onChange: (v: string) => void, placeholder?: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] }
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-green-600 underline underline-offset-4 decoration-green-300 hover:decoration-green-600 transition-colors cursor-pointer',
        },
      }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-xl shadow-md my-8 w-full max-w-full h-auto',
        },
      }),
      Youtube.configure({
        nocookie: true,
        allowFullscreen: true,
        HTMLAttributes: {
          class: 'w-full aspect-video rounded-2xl shadow-lg my-10 border border-gray-100',
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-lg sm:prose-xl focus:outline-none min-h-[300px] mt-4 max-w-none text-gray-800 dark:prose-invert dark:text-gray-300 dark:prose-headings:text-gray-100 dark:prose-strong:text-gray-100'
      }
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      const currentSelection = editor.state.selection;
      editor.commands.setContent(value, false);
      editor.commands.setTextSelection(currentSelection);
    }
  }, [value, editor]);

  if (!editor) return null;

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return; // cancelled
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt('Enter Image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addYoutube = () => {
    const url = window.prompt('Enter YouTube URL:');
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
      });
    }
  };

  return (
    <div className="w-full flex flex-col relative group">
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="flex items-center bg-gray-900 text-white rounded-lg shadow-xl overflow-hidden py-1 px-2 border border-gray-800">
          <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 hover:bg-gray-800 transition-colors ${editor.isActive('bold') ? 'text-green-400' : 'text-gray-300'}`}><Bold size={16} /></button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 hover:bg-gray-800 transition-colors ${editor.isActive('italic') ? 'text-green-400' : 'text-gray-300'}`}><Italic size={16} /></button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 hover:bg-gray-800 transition-colors ${editor.isActive('underline') ? 'text-green-400' : 'text-gray-300'}`}><UnderlineIcon size={16} /></button>
          <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-2 hover:bg-gray-800 transition-colors ${editor.isActive('strike') ? 'text-green-400' : 'text-gray-300'}`}><Strikethrough size={16} /></button>
          <div className="w-px h-5 bg-gray-700 mx-1"></div>
          <button onClick={addLink} className={`p-2 hover:bg-gray-800 transition-colors ${editor.isActive('link') ? 'text-green-400' : 'text-gray-300'}`}><LinkIcon size={16} /></button>
          {editor.isActive('link') && (
            <button onClick={() => editor.chain().focus().unsetLink().run()} className="p-2 hover:bg-gray-800 transition-colors text-red-400"><Unlink size={16} /></button>
          )}
          <div className="w-px h-5 bg-gray-700 mx-1"></div>
          <button onClick={() => editor.chain().focus().toggleCode().run()} className={`p-2 hover:bg-gray-800 transition-colors ${editor.isActive('code') ? 'text-green-400' : 'text-gray-300'}`}><Code size={16} /></button>
        </BubbleMenu>
      )}

      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }} className="flex items-center gap-1">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-full flex items-center p-1">
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-100 dark:bg-gray-700 text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`} title="Heading 1"><Heading1 size={18} /></button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-100 dark:bg-gray-700 text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`} title="Heading 2"><Heading2 size={18} /></button>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>
            <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${editor.isActive('bulletList') ? 'bg-gray-100 dark:bg-gray-700 text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`} title="Bullet List"><List size={18} /></button>
            <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${editor.isActive('orderedList') ? 'bg-gray-100 dark:bg-gray-700 text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`} title="Numbered List"><ListOrdered size={18} /></button>
            <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${editor.isActive('blockquote') ? 'bg-gray-100 dark:bg-gray-700 text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`} title="Quote"><Quote size={18} /></button>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>
            <button onClick={addImage} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300" title="Add Image"><ImageIcon size={18} /></button>
            <button onClick={addYoutube} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300" title="Add YouTube Video"><YoutubeIcon size={18} /></button>
          </div>
        </FloatingMenu>
      )}

      <EditorContent editor={editor} />
      <style jsx global>{`
        .is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          color: #adb5bd;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        /* Make sure videos resize nicely */
        .ProseMirror iframe {
          max-width: 100%;
          border-radius: 0.75rem;
        }
        
        /* Remove default blue outline on focus */
        .ProseMirror:focus {
          outline: none;
        }
        
        /* Default dark mode placeholder overrides for Tiptap */
        .dark .ProseMirror p.is-editor-empty:first-child::before {
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}
