import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdCheckCircle, MdAdd } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { getCodeById } from "../Firebase";
import "./PreviewCode.css";
import CodeSnippet from "../Components/Snippet";

const extensions = {
  // C / C++
  cpp: "cpp",
  c: "c",

  // JavaScript ecosystem
  javascript: "js",
  typescript: "ts",

  // Backend / general-purpose
  python: "py",
  java: "java",
  go: "go",
  rust: "rs",
  php: "php",
  ruby: "rb",
  csharp: "cs",

  // Mobile
  swift: "swift",
  kotlin: "kt",
  dart: "dart",

  // Web / config
  json: "json",
  yaml: "yml",
  xml: "xml",
  markdown: "md",
  sql: "sql",

  // DevOps / shell
  bash: "sh",
  dockerfile: "Dockerfile"
};


function PreviewCode() {
  const { id } = useParams();
  const nav = useNavigate();

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Fetch Code
  useEffect(() => {
    getCodeById(id)
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching code:", err);
        setError("Snippet not found or expired.");
        setLoading(false);
      });
  }, [id]);

  // Handle Copy
  const handleCopy = () => {
    navigator.clipboard.writeText(data.code).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  if (!data) return <h1>Loading...</h1>

  return (
    <div className="App">
      <div className="ambient-glow"></div>

      {/* Logo / Home Link */}
      <div className="header-nav">
        <div className="logo" onClick={() => nav("/")}>
          Code<span>Snap</span>
        </div>
      </div>

      <div className="preview-container">
        {/* Window Header */}
        <div className="window-bar">
          <div className="window-controls">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="filename">{id}.{extensions[data.language]}</div>
          {/* Spacer to balance flex */}
          <div style={{ width: '50px' }}></div>
        </div>

        {/* Code Area */}
        <div className="code-display">
          <CodeSnippet loadedCode={data.code} id={id} />
        </div>
      </div>

      {/* Action Bar */}
      {!loading && !error && (
        <div className="action-bar">
          <button className="btn" onClick={() => nav("/")}>
            <MdAdd size={20} /> New Snippet
          </button>
          <button className="btn primary" onClick={handleCopy}>
            {copySuccess ? (
              <>
                <MdCheckCircle size={20} /> Copied!
              </>
            ) : (
              <>
                <IoCopyOutline size={20} /> Copy Code
              </>
            )}
          </button>
        </div>
      )}

      {/* Toast for copy feedback */}
      <div className={`toast ${copySuccess ? 'show' : ''}`}>
        <span>Code copied to clipboard</span>
      </div>
    </div>
  );
}

export default PreviewCode;