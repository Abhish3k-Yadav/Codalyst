import { useState, useEffect, useRef } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import './App.css';

// Add new imports for animation and icons
import { FaMagic } from 'react-icons/fa';

function App() {
  // Remove static code default, use empty string
  const [code, setCode] = useState("");
  // Animated typing state for code hint
  const [typedHint, setTypedHint] = useState("");
  const [typingForward, setTypingForward] = useState(true);
  const hintText = "code here ... ";
  const typingInterval = 110;
  const deletingInterval = 60;
  const pauseTime = 700;
  const typingRef = useRef();
  const [review, setReview] = useState(
    'CODALYST: Boost your code 🚀 with smart AI reviews 🤖 for better quality ✅ and faster results ⚡'
  );
  const [isReviewing, setIsReviewing] = useState(false);
  const [theme, setTheme] = useState(() => {
    // Check localStorage or system preference
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });
  const [toggleAnim, setToggleAnim] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionType, setTransitionType] = useState(''); // 'sunrise' or 'sunset'
  const [toast, setToast] = useState(null); // { type: 'error'|'success', message: string }
  const [fetching, setFetching] = useState(false); // for fetching notification
  const [fetchPop, setFetchPop] = useState(false); // for animated pop-up

  useEffect(() => {
    prism.highlightAll();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setToggleAnim(true);
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTransitionType(nextTheme === 'light' ? 'sunrise' : 'sunset');
    setShowTransition(true);
    setTimeout(() => {
      setTheme(nextTheme);
      setToggleAnim(false);
    }, 900); // let animation play before theme actually changes
    setTimeout(() => setShowTransition(false), 1800);
  };

  const clearCode = () => {
    setCode('');
  };

  async function reviewCode() {
    setIsReviewing(true);
    setFetching(true);
    setFetchPop(true);
    try {
      const response = await axios.post('https://codalyst.onrender.com/ai/get-review', { code });
      setReview(response.data);
      setToast({ type: 'success', message: '✨ Your code review is ready! ✨' });
    } catch (error) {
      setReview('Error fetching review. Please try again.');
      setToast({ type: 'error', message: 'Error fetching review. Please try again.' });
    } finally {
      setIsReviewing(false);
      setTimeout(() => setFetching(false), 800); // keep fetching for a bit
      setTimeout(() => setFetchPop(false), 1800); // pop stays a bit longer
    }
  }

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    if (code && code.trim() !== "") return; // Only animate when editor is empty
    let timeout;
    if (typingForward) {
      if (typedHint.length < hintText.length) {
        timeout = setTimeout(() => setTypedHint(hintText.slice(0, typedHint.length + 1)), typingInterval);
      } else {
        timeout = setTimeout(() => setTypingForward(false), pauseTime);
      }
    } else {
      if (typedHint.length > 0) {
        timeout = setTimeout(() => setTypedHint(hintText.slice(0, typedHint.length - 1)), deletingInterval);
      } else {
        timeout = setTimeout(() => setTypingForward(true), pauseTime);
      }
    }
    return () => clearTimeout(timeout);
  }, [typedHint, typingForward, code]);

  // Restore original highlight function
  const highlight = code => prism.highlight(code, prism.languages.javascript, "javascript");

  const copyToClipboard = (text, label = 'Copied!') => {
    navigator.clipboard.writeText(text);
    setToast({ type: 'success', message: label });
  };

  return (
    <>
      {showTransition && (
        <div className={`theme-transition-overlay ${transitionType}`}>
          <div className="sky"></div>
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
          <div className="cloud cloud3"></div>
          <div className="sun"></div>
          {transitionType === 'sunset' && (
            <>
              <div className="stars stars1"></div>
              <div className="stars stars2"></div>
              <div className="star-twinkle s1"></div>
              <div className="star-twinkle s2"></div>
              <div className="star-twinkle s3"></div>
              <div className="star-twinkle s4"></div>
              <div className="star-twinkle s5"></div>
            </>
          )}
        </div>
      )}
      <header>
        ⚡ CODALYST v2.0 ⚡
        <button
          onClick={toggleTheme}
          style={{
            marginLeft: '1rem',
            float: 'right',
            background: 'none',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            color: 'inherit',
          }}
          aria-label="Toggle dark/light mode"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className={toggleAnim ? 'theme-toggle-anim' : ''}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </header>
      <main>
        <div className="left">
          <div className="left-header">
            <h3>Code Editor</h3>
            <div className="button-bar">
              <button onClick={clearCode} title="Clear">🗑️</button>
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
              onValueChange={code => setCode(code)}
              highlight={highlight}
              padding={10}
              style={{
                fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                fontSize: 16,
                border: "none",
                borderRadius: "5px",
                minHeight: "100%",
                width: "100%",
                overflow: "auto",
                backgroundColor: "var(--color-code-bg)",
                color: "var(--color-code-text)"
              }}
            />
            {/* Animated code hint */}
            {(!code || code.trim() === '') && (
              <div className="code-hint-animate">
                <span className="code-hint-cursor">|</span>
                <span className="code-hint-typed">{typedHint}</span>
                <span className="code-hint-finger" role="img" aria-label="feather">🪶</span>
              </div>
            )}
          </div>
        </div>
        <div className="right">
          <h3>Code Review
            {(!isReviewing && review !== 'CODALYST: Boost your code 🚀 with smart AI reviews 🤖 for better quality ✅ and faster results ⚡') && (
              <button className="copy-review-btn" onClick={() => copyToClipboard(review, 'Review copied!')} title="Copy Review">📋</button>
            )}
          </h3>
          <div className="review-content">
            {/* Animated main message if not reviewing and no review yet */}
            {!isReviewing && review === 'CODALYST: Boost your code 🚀 with smart AI reviews 🤖 for better quality ✅ and faster results ⚡' && (
              <div className="codalyst-main-message">
                <span className="codalyst-gradient-text">CODALYST:</span>
                <span className="codalyst-boost"> Boost your code 🚀</span>
                <span className="codalyst-ai"> with smart AI reviews 🤖</span>
                <span className="codalyst-quality"> for better quality ✅</span>
                <span className="codalyst-speed"> and faster results ⚡</span>
                <FaMagic className="codalyst-magic" />
              </div>
            )}
            {/* New animated loading spinner */}
            {isReviewing && (
              <div className="codalyst-loader-alt">
                <div className="dot-spinner">
                  <div className="dot dot1"></div>
                  <div className="dot dot2"></div>
                  <div className="dot dot3"></div>
                  <div className="dot dot4"></div>
                </div>
                <div className="loader-text-alt">Letting CODALYST work its magic...</div>
              </div>
            )}
            {/* Show review if not loading and not main message */}
            {!isReviewing && review !== 'CODALYST: Boost your code 🚀 with smart AI reviews 🤖 for better quality ✅ and faster results ⚡' && (
              <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
            )}
          </div>
          {/* Fetching notification pop-up */}
          {fetchPop && (
            <div className="fetch-pop fetch-pop-mini fetch-pop-magic">
              <FaMagic className="fetch-pop-icon magic-wand" />
              <span className="fetch-pop-text">Preparing your review...</span>
            </div>
          )}
        </div>
      </main>
      {toast && (
        <div className={`toast ${toast.type} toast-animate toast-minimal`}>{toast.message}</div>
      )}
    </>
  );
}

export default App;
