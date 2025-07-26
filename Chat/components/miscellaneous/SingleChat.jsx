import React, { useState, useEffect } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import ProfileModal from "./ProfileModal";
import { Button, Form, Spinner } from "react-bootstrap";
import { FaEye, FaArrowLeft } from "react-icons/fa";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import axios from "axios";
import { toast } from "react-toastify";
import ScrollableChat from "../ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:1000";
let socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);

  // Socket setup
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));

    return () => socket.disconnect();
  }, [user]);

  // Fetch messages when selectedChat changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;

      try {
        setLoading(true);
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };

        const { data } = await axios.get(
          `${ENDPOINT}/api/message/${selectedChat._id}`,
          config
        );

        setMessages(data);
        socket.emit("join chat", selectedChat._id);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load messages");
        setLoading(false);
      }
    };

    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat, user.token]);

  // Listen for incoming messages
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // Optional: add notification logic here
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    });

    return () => socket.off("message received");
  }, []);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage.trim()) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post(
          `${ENDPOINT}/api/message`,
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        setNewMessage("");
        setMessages([...messages, data]);
        socket.emit("new message", data);
      } catch (error) {
        toast.error("Failed to send message");
      }
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      {selectedChat ? (
        <>
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
            <Button
              variant="light"
              className="d-md-none"
              onClick={() => setSelectedChat("")}
            >
              <FaArrowLeft />
            </Button>

            {!selectedChat.isGroupChat ? (
              <div className="d-flex align-items-center gap-2">
                <h6 className="mb-0">{getSender(user, selectedChat.users)}</h6>
                <ProfileModal user={getSenderFull(user, selectedChat.users)}>
                  <Button variant="light" size="sm">
                    <FaEye />
                  </Button>
                </ProfileModal>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <h6 className="mb-0">{selectedChat.chatName.toUpperCase()}</h6>
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </div>
            )}
          </div>

          <div className="flex-grow-1 p-3 overflow-auto bg-light">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <Spinner animation="border" />
              </div>
            ) : (
              <ScrollableChat messages={messages} />
            )}
          </div>

          <div className="p-3 border-top bg-white">
            <Form.Control
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={sendMessage}
            />
          </div>
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-center h-100">
          <p className="text-muted">Click on a user to start chatting</p>
        </div>
      )}
    </div>
  );
}

export default SingleChat;
