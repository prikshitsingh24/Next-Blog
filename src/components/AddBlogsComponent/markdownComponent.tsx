
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return <ReactMarkdown
  children={content}
  remarkPlugins={[[remarkGfm, {singleTilde: false}]]}
  rehypePlugins={[[rehypeRaw]]}
  components={{
    h1: ({ children, ...props } :{ children: React.ReactNode }) => (
        <h1 className="text-2xl" {...props}>
          {children}
        </h1>
      ),
      h2: ({ children, ...props }: { children: React.ReactNode }) => (
        <h2 className="text-xl" {...props}>
          {children}
        </h2>
      ),
      h3: ({ children, ...props }: { children: React.ReactNode }) => (
        <h3 className="text-md" {...props}>
          {children}
        </h3>
      ),
    code({node, inline, className, children, ...props}:  { node: React.ReactNode; inline: boolean; className: string; children: React.ReactNode }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/, '')}
          language={match[1]}
          PreTag="div"
        />
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      )
    }
  }}
/>
};

export default MarkdownRenderer;



