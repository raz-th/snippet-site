import { useEffect, useRef, useState } from "react";
import { getCodeById } from "../Firebase";

import hljs from "highlight.js/lib/core";

import cpp from "highlight.js/lib/languages/cpp";
import c from "highlight.js/lib/languages/c";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import go from "highlight.js/lib/languages/go";
import rust from "highlight.js/lib/languages/rust";
import csharp from "highlight.js/lib/languages/csharp";
import php from "highlight.js/lib/languages/php";
import ruby from "highlight.js/lib/languages/ruby";
import swift from "highlight.js/lib/languages/swift";
import kotlin from "highlight.js/lib/languages/kotlin";
import dart from "highlight.js/lib/languages/dart";
import bash from "highlight.js/lib/languages/bash";
import sql from "highlight.js/lib/languages/sql";
import json from "highlight.js/lib/languages/json";
import yaml from "highlight.js/lib/languages/yaml";
import xml from "highlight.js/lib/languages/xml";
import markdown from "highlight.js/lib/languages/markdown";

import "highlight.js/styles/monokai.css";




hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("c", c);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("go", go);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("php", php);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("swift", swift);
hljs.registerLanguage("kotlin", kotlin);
hljs.registerLanguage("dart", dart);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("json", json);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("markdown", markdown);




const CodeSnippet = ({ loadedCode, id, language = "cpp" }) => {
  const [highlightedHtml, setHighlightedHtml] = useState(null);

  const handleLoadCode = async (retrievedId) => {
     if (loadedCode && retrievedId) {
        const result = hljs.highlight(loadedCode, { language });
        setHighlightedHtml(result.value);
      } else {
        setHighlightedHtml("Could not find the code for ID:" + retrievedId);
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