import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";

function Chatbot() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && !file) return;

    setLoading(true);

    const userEntry = { type: "user", content: text };
    setMessages((prev) => [...prev, userEntry]);

    const formData = new FormData();
    formData.append("text", text);
    if (file) formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/feedback/", formData);
      const botEntry = { type: "bot", content: res.data.response };
      setMessages((prev) => [...prev, botEntry]);
    } catch (err) {
      console.error(err);
      const errEntry = { type: "bot", content: "Error getting response. Please try again." };
      setMessages((prev) => [...prev, errEntry]);
    } finally {
      setText("");
      setFile(null);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="chatbot-wrapper">
      <div className="chatbot-container">
        <div className="chatbot-inner">
          <h1 className="chatbot-title">Personalized Assistant</h1>

          {/* Response History */}
          <div className="chatbot-response-area">
            {messages.length === 0 ? (
              <div className="chatbot-response-placeholder">
                <p>Responses will appear here</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={
                    msg.type === "user"
                      ? "chatbot-message-user"
                      : "chatbot-message-bot"
                  }
                >
                  <p>{msg.content}</p>
                </div>
              ))
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="chatbot-form">
            {file && (
              <div className="chatbot-file-display">
                <span className="chatbot-file-name">{file.name}</span>
                <button
                  type="button"
                  onClick={removeFile}
                  className="chatbot-file-remove"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="chatbot-input-container">
              <textarea
                rows="4"
                placeholder="Type your message here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="chatbot-textarea"
              />

              <div className="chatbot-buttons">
                <label className="chatbot-upload-label">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                  </svg>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="chatbot-upload-input"
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading || (!text && !file)}
                  className="chatbot-submit-btn"
                >
                  {loading ? (
                    <span className="chatbot-loading"></span>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
