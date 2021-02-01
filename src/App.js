import React, { useState, useEffect } from "react";
import { DonutLarge, Chat, MoreVert, Search } from "@material-ui/icons";
import "./App.css";
import ChatListItem from "./components/ChatListItem";
import ChatWindow from "./components/ChatWindow";
import ChatIntro from "./components/ChatIntro";

export default () => {
  const [chatList, setChatList] = useState([
    {
      chatId: 1,
      title: "Alice",
      image: "https://www.w3schools.com/howto/img_avatar2.png",
    },
    {
      chatId: 2,
      title: "Pedro",
      image: "https://www.w3schools.com/howto/img_avatar2.png",
    },
    {
      chatId: 3,
      title: "Luana",
      image: "https://www.w3schools.com/howto/img_avatar2.png",
    },
    {
      chatId: 4,
      title: "Paulo",
      image: "https://www.w3schools.com/howto/img_avatar2.png",
    },
  ]);

  const [activeChat, setActiveChat] = useState({});

  return (
    <div className="app-window">
      <div className="sidebar">
        <header>
          <img
            className="header-avatar"
            src="https://www.w3schools.com/howto/img_avatar2.png"
            alt=""
          />
          <div className="header-buttons">
            <div className="header-btn">
              <DonutLarge style={{ color: "#919191" }} />
            </div>
            <div className="header-btn">
              <Chat style={{ color: "#919191" }} />
            </div>
            <div className="header-btn">
              <MoreVert style={{ color: "#919191" }} />
            </div>
          </div>
        </header>

        <div className="search">
          <div className="search-input">
            <Search fontSize="small" style={{ color: "#919191" }} />
            <input
              type="search"
              placeholder="Procurar ou começar uma nova conversa"
            />
          </div>
        </div>

        <div className="chatList">
          {chatList.map((item, key) => (
            <ChatListItem
              key={key}
              data={item}
              onClick={() => setActiveChat(chatList[key])}
              active={activeChat.chatId === chatList[key].chatId}
            />
          ))}
        </div>
      </div>

      <div className="content-area">
        {activeChat.chatId !== undefined && <ChatWindow />}
        {activeChat.chatId === undefined && <ChatIntro />}
      </div>
    </div>
  );
};
