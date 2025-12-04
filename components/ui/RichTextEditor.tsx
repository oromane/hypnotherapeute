"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Image as ImageIcon, // Renomme l'icône pour éviter un conflit de nom
} from "lucide-react"
import React from "react" 

// ==========================================================
// La barre d'outils
// ==========================================================
const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  // Fonction pour ajouter une image depuis une URL
  const addImage = () => {
    // NOTE: Pour l'instant, on demande une URL. Le système d'upload
    // sera la prochaine amélioration!
    const url = window.prompt("URL de l'image (ex: https://monsite.fr/image.jpg)") 
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  // Styles pour les boutons de la barre d'outils
  const buttonClass =
    "p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
  const activeClass = "is-active bg-primary text-primary-foreground hover:bg-primary"

  return (
    <div className="flex flex-wrap gap-2 p-2 border border-border bg-background rounded-t-lg sticky top-0 z-10">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`${buttonClass} ${editor.isActive("bold") ? activeClass : ""}`}
        title="Gras (Ctrl+B)"
      >
        <Bold className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`${buttonClass} ${editor.isActive("italic") ? activeClass : ""}`}
        title="Italique (Ctrl+I)"
      >
        <Italic className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${buttonClass} ${
          editor.isActive("heading", { level: 1 }) ? activeClass : ""
        }`}
        title="Titre Principal (H1)"
      >
        <Heading1 className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${buttonClass} ${
          editor.isActive("heading", { level: 2 }) ? activeClass : ""
        }`}
        title="Sous-titre (H2)"
      >
        <Heading2 className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${buttonClass} ${
          editor.isActive("heading", { level: 3 }) ? activeClass : ""
        }`}
        title="Sous-titre de niveau 3 (H3)"
      >
        <Heading3 className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${buttonClass} ${editor.isActive("bulletList") ? activeClass : ""}`}
        title="Liste à puces"
      >
        <List className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${buttonClass} ${editor.isActive("orderedList") ? activeClass : ""}`}
        title="Liste numérotée"
      >
        <ListOrdered className="w-5 h-5" />
      </button>
      <button type="button" onClick={addImage} className={buttonClass} title="Ajouter une image (URL)">
        <ImageIcon className="w-5 h-5" />
      </button>
    </div>
  )
}

// ==========================================================
// L'éditeur Tiptap principal
// ==========================================================
interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
}

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3], 
        },
      }),
      Image.configure({
        inline: false, 
      }),
    ],
    content: content, 
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()) // Exporte en HTML et le renvoie au parent
    },
    editorProps: {
      attributes: {
        // Applique les styles "prose" de Tailwind
        class:
          "prose dark:prose-invert prose-sm sm:prose-base min-h-[300px] w-full max-w-none p-4 border border-border border-t-0 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background overflow-y-auto",
      },
    },
  })

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}