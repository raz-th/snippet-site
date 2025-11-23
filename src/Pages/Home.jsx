import { useState } from "react";
import { MdOutlineFileUpload, MdOutlineContentCopy } from "react-icons/md";
import { storeCodeAndGetId } from "../Firebase";

function Home() {
  const [showInfo, setShowInfo] = useState(false);
  const [id, setId] = useState("");
  const [text, setText] = useState("");

  const share = () => {
    storeCodeAndGetId(text).then((id) => {
      setId(id);
      setShowInfo(true);
    });
  };

  return (
    <div className="App">
      {showInfo && (
        <div className="infoContainer" onClick={() => setShowInfo(false)}>
          <div className="infoDiv">
            <h1>
              Share link: {document.location.href}preview/{id}
            </h1>
            <MdOutlineContentCopy
              style={{ cursor: "pointer" }}
              size={40}
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(
                  `${document.location.href}preview/${id}`
                );
              }}
            />
          </div>
        </div>
      )}{" "}
      <main className="main1">
        <h1 className="main1_title">
          Share Code in a <span>Snap</span>
        </h1>
        <h3>
          The fastest way to share code snippets with your team. No accounts, no
          fuss - just pure coding speed.
        </h3>
      </main>
      <section>
        <div className="card add">
          <div className="header">
            <div className="top">
              <div className="circle">
                <span className="red circle2"></span>
              </div>
              <div className="circle">
                <span className="yellow circle2"></span>
              </div>
              <div className="circle">
                <span className="green circle2"></span>
              </div>
              <div className="title">
                <p>new_snippet.cpp</p>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                marginTop: 20,
              }}
            >
              <textarea
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
                placeholder="Paste your code here..."
              ></textarea>
            </div>
            <div className="card_bottom_bar">
              {/* <select>
            <option value="cpp">C++</option>
            <option value="cs">C#</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select> */}
              <div />
              <button className="btn" onClick={share}>
                <MdOutlineFileUpload size={40} /> Create Share Link
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
