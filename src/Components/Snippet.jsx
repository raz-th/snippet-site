import hljs from "highlight.js/lib/core";
import cpp from "highlight.js/lib/languages/cpp";
import "highlight.js/styles/monokai.css";

import { useEffect, useRef, useState } from "react";
import { getCodeById } from "../Firebase";

hljs.registerLanguage("cpp", cpp);

const CodeSnippet = ({ id }) => {
  const [highlightedHtml, setHighlightedHtml] = useState(null);

  const handleLoadCode = async (retrievedId) => {
    try {
      const loadedCode = await getCodeById(retrievedId);
      
      if (loadedCode) {
        const result = hljs.highlight(loadedCode, { language: 'cpp' });
        setHighlightedHtml(result.value);
      } else {
        setHighlightedHtml("Could not find the code for ID:" + retrievedId);
      }
    } catch (error) {
      console.error("Failed to load code:", error);
    }
  };

  useEffect(() => {
    handleLoadCode(id);
  }, [id]);


  if (highlightedHtml === null) {
      return <pre><code>Loading...</code></pre>
  }

  return (
    <pre>
      <code 
        className="cpp" 
        style={{ background: "transparent" }} 
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </pre>
  );
};

export default CodeSnippet;