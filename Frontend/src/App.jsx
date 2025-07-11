import { useState, useEffect } from 'react';
import 'prismjs/themes/prism-tomorrow.css';
import Editor from 'react-simple-code-editor';
import prism from 'prismjs';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState(`// Code here`);
  const defaultReviewMessage = 'CODALYST: Boost your code 🚀 with smart AI reviews 🤖 for better quality ✅ and faster results ⚡';
  const [review, setReview] = useState(defaultReviewMessage);
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  const clearCode = () => {
    setCode('');
  };

  async function reviewCode() {
    setIsReviewing(true);
    try {
      const response = await axios.post(
        'https://codalyst.onrender.com/ai/get-review',
        { code }
      );
      setReview(response.data);
    } catch {
      setReview('Error fetching review. Please try again.');
    } finally {
      setIsReviewing(false);
    }
  }

  return (
    <>
      <header>⚡ CODALYST v2.0 ⚡</header>
      <main>
        <div className="left">
          <div className="left-header">
            <h3>Code Editor</h3>
            <div className="button-bar">
              <button onClick={clearCode} title="Clear" aria-label="Clear code editor">
                🗑️
              </button>
              <button
                onClick={reviewCode}
                className={`review-btn ${isReviewing ? 'reviewing' : ''}`}
                disabled={isReviewing}
                aria-label="Review code"
              >
                Review
              </button>
            </div>
          </div>
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={10}
              style={{
                fontFamily: '"JetBrains Mono", "Fira Code", "Menlo", "Monaco", "Consolas", monospace',
                fontSize: 16,
                border: 'none',
                borderRadius: '5px',
                minHeight: '100%',
                width: '100%',
                overflow: 'auto',
                backgroundColor: '#1e1e1e',
                color: '#d4d4d4',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
        <div className="right">
          <h3>Code Review</h3>
          <div className="review-content">
            {isReviewing ? (
              <div className="loading-spinner" style={{ textAlign: 'center', padding: '2rem' }}>
                <span className="lds-dual-ring"></span>
                <span role="status" aria-live="polite">Reviewing your code...</span>
              </div>
            ) : (
              <Markdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  p: ({ node, ...props }) =>
                    review === defaultReviewMessage ? (
                      <p className="default-review-message" {...props} />
                    ) : (
                      <p className="review-feedback" {...props} />
                    ),
                  ul: ({ node, ...props }) => <ul className="review-feedback-list" {...props} />,
                  ol: ({ node, ...props }) => <ol className="review-feedback-list" {...props} />,
                  li: ({ node, ...props }) => <li className="review-feedback-list-item" {...props} />,
                }}
              >{review}</Markdown>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
