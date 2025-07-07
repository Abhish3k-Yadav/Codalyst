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
  const [review, setReview] = useState(
    'CODALYST: Boost your code 🚀 with smart AI reviews 🤖 for better quality ✅ and faster results ⚡'
  );
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
        'https://codalyst-1.onrender.com/ai/get-review',
        { code }
      );
      setReview(response.data);
    } catch (error) {
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
              <button onClick={clearCode} title="Clear">
                🗑️
              </button>
              <button
                onClick={reviewCode}
                className={`review-btn ${isReviewing ? 'reviewing' : ''}`}
              >
                Review
              </button>
            </div>
          </div>
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, 'javascript')
              }
              padding={10}
              style={{
                fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                fontSize: 16,
                border: 'none',
                borderRadius: '5px',
                minHeight: '100%',
                width: '100%',
                overflow: 'auto',
                backgroundColor: '#2a2a2a',
                color: '#e0e0e0',
              }}
            />
          </div>
        </div>
        <div className="right">
          <h3>Code Review</h3>
          <div className="review-content">
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});
