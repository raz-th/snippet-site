import React, { useState } from "react";
import { MdOutlineFileUpload, MdCheckCircle } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { storeCodeAndGetId } from "../Firebase";
import "../App.css";

// Language configuration
const languages = [
  { value: "cpp", label: "C++", ext: "cpp" },
  { value: "c", label: "C", ext: "c" },

  { value: "javascript", label: "JavaScript", ext: "js" },
  { value: "typescript", label: "TypeScript", ext: "ts" },

  { value: "python", label: "Python", ext: "py" },

  { value: "java", label: "Java", ext: "java" },
  { value: "csharp", label: "C#", ext: "cs" },

  { value: "go", label: "Go", ext: "go" },
  { value: "rust", label: "Rust", ext: "rs" },

  { value: "php", label: "PHP", ext: "php" },
  { value: "ruby", label: "Ruby", ext: "rb" },

  { value: "swift", label: "Swift", ext: "swift" },
  { value: "kotlin", label: "Kotlin", ext: "kt" },
  { value: "dart", label: "Dart", ext: "dart" },

  { value: "bash", label: "Bash / Shell", ext: "sh" },

  { value: "json", label: "JSON", ext: "json" },
  { value: "yaml", label: "YAML", ext: "yml" },
  { value: "xml", label: "HTML / XML", ext: "html" },
  { value: "markdown", label: "Markdown", ext: "md" },

  { value: "sql", label: "SQL", ext: "sql" },

  { value: "dockerfile", label: "Dockerfile", ext: "Dockerfile" }
];


function Home() {
  const [showInfo, setShowInfo] = useState(false);
  const [id, setId] = useState("");
  const [text, setText] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Language State (Defaulting to C++)
  const [language, setLanguage] = useState(languages[0]);

  const share = () => {
    if (!text.trim()) return;

    setIsSharing(true);
    // You could also pass 'language.value' to your Firebase function if you want to store the language type
    storeCodeAndGetId(text, language.value)
      .then((id) => {
        setId(id);
        setShowInfo(true);
        setIsSharing(false);
        setCopySuccess(false);
      })
      .catch((err) => {
        console.error("Error sharing code:", err);
        setIsSharing(false);
      });
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    const link = `${window.location.href}preview/${id}`;

    navigator.clipboard.writeText(link).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const closeModal = () => {
    setShowInfo(false);
  };

  return (
    <div className="App">
      <div className="ambient-glow"></div>

      {showInfo && (
        <div className="infoContainer" onClick={closeModal}>
          <div className="infoDiv" onClick={(e) => e.stopPropagation()}>
            <h2>Code Snippet Ready!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>Here is your shareable link:</p>

            <div className="link-box">
              {window.location.href}preview/{id}
            </div>

            <button className="copy-btn" onClick={handleCopy}>
              {copySuccess ? (
                <>
                  <MdCheckCircle style={{ color: '#10b981' }} /> Copied!
                </>
              ) : (
                <>
                  <IoCopyOutline /> Copy Link
                </>
              )}
            </button>

            <div className="close-hint">Click anywhere or press ESC to close</div>
          </div>
        </div>
      )}

      <main className="container">
        <section className="hero">
          <h1>
            Share Code in a <span>Snap</span>
          </h1>
          <h3>
            The fastest way to share code snippets with your team. No accounts,
            no fuss - just pure coding speed.
          </h3>
        </section>

        <section>
          <div className="editor-wrapper">

            {/* --- Window Header --- */}
            <div className="window-bar">
              <div className="dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>

              {/* --- Language Dropdown --- */}
              <div className="lang-wrapper">
                <select
                  className="lang-select"
                  value={language.value}
                  onChange={(e) => {
                    const selected = languages.find(lang => lang.value === e.target.value);
                    setLanguage(selected);
                  }}
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* --- Editor Body --- */}
            <div className="code-area-container">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`// Paste your ${language.label} code here...`}
              ></textarea>
            </div>

            {/* --- Action Button --- */}
            <div className="actions">
              <button className="btn" onClick={share} disabled={isSharing}>
                {isSharing ? (
                  "Generating..."
                ) : (
                  <>
                    <MdOutlineFileUpload size={24} /> Create Share Link
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;