import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./ChatWindow.css";

import {
  AttachFile,
  MoreVert,
  Search,
  InsertEmoticon,
  Close,
  Send,
  Mic,
} from "@material-ui/icons";

export default () => {
  let recognition = null;
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition();
  }

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");

  const handleEmojiClick = (e, emojiObject) => {
    setText(text + emojiObject.emoji);
  };

  const handleOpenEmoji = () => {
    setEmojiOpen(true);
  };

  const handleCloseEmoji = () => {
    setEmojiOpen(false);
  };

  const handleMicClick = () => {
    if (recognition !== null) {
      recognition.onstart = () => {
        setListening(true);
      };
      recognition.onend = () => {
        setListening(false);
      };
      recognition.onresult = (e) => {
        setText(e.results[0][0].transcript);
      };
      recognition.start();
    }
  };

  const handleSendClick = () => {};

  return (
    <div className="chatWindow">
      <div className="chatWindow-header">
        <div className="chatWindow-headerInfo">
          <img
            className="chatWindow-avatar"
            src="https://www.w3schools.com/howto/img_avatar2.png"
            alt=""
          />
          <div className="chatWindow-name">Lara Santos</div>
        </div>

        <div className="chatWindow-headerButtons">
          <div className="chatWindow-btn">
            <Search style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow-btn">
            <AttachFile style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow-btn">
            <MoreVert style={{ color: "#919191" }} />
          </div>
        </div>
      </div>

      <div className="chatWindow-body"></div>

      <div
        className="chatWindow-emojiArea"
        style={{ height: emojiOpen ? "200px" : "0px" }}
      >
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableSearchBar
          disableSkinTonePicker
        />
      </div>

      <div className="chatWindow-footer">
        <div className="chatWindow-pre">
          <div
            className="chatWindow-btn"
            onClick={handleCloseEmoji}
            style={{ width: emojiOpen ? 40 : 0 }}
          >
            <Close style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow-btn" onClick={handleOpenEmoji}>
            <InsertEmoticon
              style={{ color: emojiOpen ? "#009688" : "#919191" }}
            />
          </div>
        </div>
        <div className="chatWindow-inputArea">
          <input
            className="chatWindow-input"
            type="text"
            placeholder="Digite uma mensagem"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="chatWindow-pos">
          {text === "" ? (
            <div onClick={handleMicClick} className="chatWindow-btn">
              <Mic style={{ color: listening ? "#126ECE" : "#919191" }} />
            </div>
          ) : (
            <div onClick={handleSendClick} className="chatWindow-btn">
              <Send style={{ color: "#919191" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
