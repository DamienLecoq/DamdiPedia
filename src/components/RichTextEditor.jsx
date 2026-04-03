import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Markdown } from 'tiptap-markdown';

// ── Toolbar button ────────────────────────────────────────────────────────────
function Btn({ active, onMouseDown, title, children, style }) {
  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      title={title}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        minWidth: 28, height: 26, padding: '0 6px',
        border: '1px solid transparent', borderRadius: 6, cursor: 'pointer',
        fontSize: '0.78rem', fontWeight: 600, lineHeight: 1,
        background: active ? 'rgba(167, 139, 250, 0.25)' : 'transparent',
        color: active ? 'var(--accent-hover)' : 'var(--text-muted)',
        borderColor: active ? 'rgba(167, 139, 250, 0.3)' : 'transparent',
        boxShadow: active ? 'inset 0 1px 0 rgba(255,255,255,0.08)' : 'none',
        transition: 'all 0.15s ease',
        ...style,
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text)'; } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; } }}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.08)', margin: '0 5px', flexShrink: 0 }} />;
}

// ── Toolbar ───────────────────────────────────────────────────────────────────
function Toolbar({ editor }) {
  if (!editor) return null;

  const cmd = (fn) => (e) => { e.preventDefault(); fn(); };

  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center',
      padding: '5px 8px',
      background: 'rgba(255, 255, 255, 0.04)',
      borderBottom: '1px solid var(--border)',
      borderRadius: '10px 10px 0 0',
    }}>
      {/* Headings */}
      <Btn
        active={editor.isActive('heading', { level: 1 })}
        onMouseDown={cmd(() => editor.chain().focus().toggleHeading({ level: 1 }).run())}
        title="Titre 1"
      >H1</Btn>
      <Btn
        active={editor.isActive('heading', { level: 2 })}
        onMouseDown={cmd(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}
        title="Titre 2"
      >H2</Btn>
      <Btn
        active={editor.isActive('heading', { level: 3 })}
        onMouseDown={cmd(() => editor.chain().focus().toggleHeading({ level: 3 }).run())}
        title="Titre 3"
      >H3</Btn>

      <Sep />

      {/* Text formatting */}
      <Btn
        active={editor.isActive('bold')}
        onMouseDown={cmd(() => editor.chain().focus().toggleBold().run())}
        title="Gras (Ctrl+B)"
        style={{ fontWeight: 800 }}
      >B</Btn>
      <Btn
        active={editor.isActive('italic')}
        onMouseDown={cmd(() => editor.chain().focus().toggleItalic().run())}
        title="Italique (Ctrl+I)"
        style={{ fontStyle: 'italic' }}
      >I</Btn>
      <Btn
        active={editor.isActive('underline')}
        onMouseDown={cmd(() => editor.chain().focus().toggleUnderline().run())}
        title="Souligné (Ctrl+U)"
        style={{ textDecoration: 'underline' }}
      >U</Btn>
      <Btn
        active={editor.isActive('strike')}
        onMouseDown={cmd(() => editor.chain().focus().toggleStrike().run())}
        title="Barré"
        style={{ textDecoration: 'line-through' }}
      >S</Btn>
      <Btn
        active={editor.isActive('code')}
        onMouseDown={cmd(() => editor.chain().focus().toggleCode().run())}
        title="Code inline"
        style={{ fontFamily: 'monospace', fontSize: '0.72rem' }}
      >{`</>`}</Btn>

      <Sep />

      {/* Lists */}
      <Btn
        active={editor.isActive('bulletList')}
        onMouseDown={cmd(() => editor.chain().focus().toggleBulletList().run())}
        title="Liste à puces"
      >• —</Btn>
      <Btn
        active={editor.isActive('orderedList')}
        onMouseDown={cmd(() => editor.chain().focus().toggleOrderedList().run())}
        title="Liste numérotée"
      >1.</Btn>
      <Btn
        active={editor.isActive('blockquote')}
        onMouseDown={cmd(() => editor.chain().focus().toggleBlockquote().run())}
        title="Citation"
        style={{ fontSize: '1rem' }}
      >❝</Btn>
      <Btn
        active={editor.isActive('codeBlock')}
        onMouseDown={cmd(() => editor.chain().focus().toggleCodeBlock().run())}
        title="Bloc de code"
        style={{ fontFamily: 'monospace', fontSize: '0.72rem' }}
      >{ '{ }' }</Btn>

      <Sep />

      {/* Other */}
      <Btn
        active={false}
        onMouseDown={cmd(() => editor.chain().focus().setHorizontalRule().run())}
        title="Séparateur horizontal"
      >─</Btn>
      <Btn
        active={false}
        onMouseDown={cmd(() => editor.chain().focus().unsetAllMarks().clearNodes().run())}
        title="Effacer la mise en forme"
        style={{ fontSize: '0.7rem' }}
      >✕ fmt</Btn>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Markdown.configure({ html: false, transformPastedText: true }),
    ],
    content: value,   // tiptap-markdown parses this as markdown on mount
    onUpdate: ({ editor }) => {
      onChange(editor.storage.markdown.getMarkdown());
    },
  });

  return (
    <div style={{
      border: '1px solid var(--border)',
      borderTopColor: 'var(--border-hi)',
      borderRadius: 'var(--radius)',
      background: 'rgba(255, 255, 255, 0.025)',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
    }}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="rte-content" />
    </div>
  );
}
