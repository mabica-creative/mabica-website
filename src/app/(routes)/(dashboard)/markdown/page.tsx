"use client"; // Tambahkan ini di atas

import { useState, ChangeEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Clipboard } from "lucide-react"; // Mengimpor ikon Clipboard dari lucide-react
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

// Header component
const Header: React.FC = () => {
  return (
    <header className="text-center my-6">
      <h1 className="text-4xl font-bold text-primary drop-shadow-md">
        Template Markdown Editor
      </h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Cara menggunakan:</AccordionTrigger>
          <AccordionContent>
            <ul className="text-left text-gray-300 mt-2">
              <li>
                <code># Heading 1</code> - Membuat judul besar
              </li>
              <li>
                <code>## Heading 2</code> - Membuat judul yang lebih kecil
              </li>
              <li>
                <code>### Heading 3</code> - Membuat judul yang lebih kecil lagi
              </li>
              <li>
                <code>**Teks Tebal**</code> - Membuat teks menjadi tebal
              </li>
              <li>
                <code>*Teks Miring*</code> - Membuat teks menjadi miring
              </li>
              <li>
                <code>~~Teks Coret~~</code> - Menambahkan coretan pada teks
              </li>
              <li>
                <code>_Teks Garis Bawah_</code> - Membuat teks menjadi bergaris
                bawah (gunakan garis bawah)
              </li>
              <li>
                <code>[Tautan](http://contoh.com)</code> - Membuat tautan
              </li>
              <li>
                <code>![Gambar](url_gambar)</code> - Menyematkan gambar
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </header>
  );
};

// MarkdownEditor component
interface MarkdownEditorProps {
  markdown: string;
  setMarkdown: (markdown: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  markdown,
  setMarkdown,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  // Fungsi untuk menyalin teks ke clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset status setelah 2 detik
    });
  };

  // Handle textarea change
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className="relative w-full lg:w-1/2">
      <textarea
        value={markdown}
        onChange={handleChange}
        placeholder="Tulis markdown di sini..."
        className="w-full h-96 p-4 border rounded-md shadow-md text-lg bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
      ></textarea>
      {/* Tombol Copy */}
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 bg-primary text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Clipboard size={20} />
        {isCopied && <span className="ml-2 text-sm">Tersalin!</span>}
      </button>
    </div>
  );
};

// MarkdownPreview component
interface MarkdownPreviewProps {
  markdown: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown }) => {
  return (
    <div className="w-full lg:w-1/2 h-96 p-4 border rounded-md shadow-md bg-gray-800 overflow-y-auto">
      <ReactMarkdown
        className="prose prose-lg text-gray-100"
        remarkPlugins={[remarkGfm]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

// Main MarkdownEditorPage component
const MarkdownEditorPage: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      {/* Header */}
      <Header />

      {/* Editor & Preview */}
      <div className="flex flex-col-reverse lg:flex-row gap-6 w-full max-w-5xl">
        {/* Markdown Input */}
        <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />

        {/* Markdown Preview */}
        <MarkdownPreview markdown={markdown} />
      </div>
    </div>
  );
};

export default MarkdownEditorPage;
