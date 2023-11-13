import React from 'react';

interface Content {
  content: string;
}

const MarkdownRenderer = ({ content }: Content) => {
  const parseMarkdown = (line:any, index:any) => {
    
    if (line.startsWith('# ')) {
      // Header
      return <h1 key={index} className="text-xl" style={{ fontFamily: 'Roboto, sans-serif' }}>{line.substring(2)}</h1>;
    } else if (line.startsWith('## ')) {
      // Header
      return <h2 key={index} className="text-l" style={{ fontFamily: 'Roboto, sans-serif' }}>{line.substring(3)}</h2>;
    } else if (line.startsWith('### ')) {
      // Header
      return <h3 key={index} className="text-md" style={{ fontFamily: 'Roboto, sans-serif' }}>{line.substring(4)}</h3>;
    } else if (line.startsWith('#### ')) {
      // Header
      return <h4 key={index} className="text-sm">{line.substring(5)}</h4>;
    }else if (line.startsWith('***')) {
      // Header
      return <div key={index} className='w-full border-t border-white my-3'></div>;
    }else if (line.startsWith('![image](') && line.endsWith(')')) {
      // Image link
      const imageUrl = line.substring(9, line.length - 1);
      return <img key={index} src={imageUrl} alt="Image" />;
    }else if (line.match(/\[.*\]\(.*\)/)) {
      // Link (early phase)
      const linkText = line.match(/\[(.*?)\]/)[1];
      const linkUrl = line.match(/\((.*?)\)/)[1];
      return (
        <a key={index} href={linkUrl} target="_blank" className='underline text-blue-500'>
          {linkText}
        </a>
      );
    }else if (line.startsWith('* ') || line.startsWith('- ')) {
      // Unordered list item
      return <li key={index}>{line.substring(2)}</li>;
    }
    else if (line.trim() === '') {
      // Empty line (considering spaces)
      return <p key={index}>&nbsp;</p>;
    }
    else {
      // Regular sentence
      const words = line.split(/(\s+)/);
      return (
        <p key={index}>
          {words.map((word:any, wordIndex:any) => {
            if (word.startsWith('**') && word.endsWith('**')) {
              // Bold text
              return <strong key={`word-${wordIndex}`} style={{ fontFamily: 'Roboto, sans-serif' }}>{word.substring(2, word.length - 2)}</strong>;
            } else if (word.startsWith('*') && word.endsWith('*')) {
              // Italic text
              return <em key={`word-${wordIndex}`} style={{ fontFamily: 'Roboto, sans-serif' }}>{word.substring(1, word.length - 1)}</em>;

            } 
            else { 
              // Regular word sdfsdf
              return <span key={`word-${wordIndex}`} style={{ fontFamily: 'Roboto, sans-serif' }}>{word}</span>;
            }
          })}
        </p>
      );
    }
  };

  const renderMarkdown = () => {
    const lines = content.split('\n');
    return lines.map((line, index) => parseMarkdown(line, index));
  };

  return <div>{renderMarkdown()}</div>;
};

export default MarkdownRenderer;

