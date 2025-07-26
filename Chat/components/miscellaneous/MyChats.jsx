import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ChatState } from "../../Context/ChatProvider";
import { Button, Spinner } from "react-bootstrap";
import { getSender } from "../../config/ChatLogics";
import GroupChatModel from "./GroupChatModel";

function MyChats({ fetchAgain }) {
  const [loggedUser, setLoggedUser] = useState(null);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:1000/api/chat",
        config
      );
      setChats(data);
    } catch (error) {
      toast.error("Failed to load chats", {
        position: "bottom-left",
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userinfo"));
    setLoggedUser(storedUser);
    fetchChats();
  }, [fetchAgain]);

  return (
    <div
      className="bg-white border rounded p-3"
      style={{ width: "30%", height: "100%", overflowY: "auto" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">My Chats</h5>
        <GroupChatModel>
          <Button size="sm" variant="outline-primary">
            New Group Chat
          </Button>
        </GroupChatModel>
      </div>

      <div className="d-flex flex-column gap-2">
        {chats ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              className={`p-2 rounded ${
                selectedChat === chat ? "bg-info text-white" : "bg-light"
              }`}
              style={{ cursor: "pointer" }}
            >
              <strong>
                {!chat.isGroupChat && chat.users
                  ? getSender(loggedUser, chat.users)
                  : chat.chatName || "Unknown Chat"}
              </strong>

              {chat.latestMessage && (
                <p className="mb-0 text-truncate small">
                  <b>{chat.latestMessage.sender?.name}:</b>{" "}
                  {chat.latestMessage.content}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="text-center mt-4">
            <Spinner animation="border" />
          </div>
        )}
      </div>
    </div>
  );
}

export default MyChats;
