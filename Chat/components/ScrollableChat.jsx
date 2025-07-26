import React from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function ScrollableChat({ messages }) {
  const { user } = ChatState();

  return (
    <div
      style={{
        overflowY: "auto",
        height: "100%",
        padding: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {messages &&
        messages.map((m, i) => (
          <div
            className="d-flex align-items-center mb-2"
            style={{ display: "flex", alignItems: "center" }}
            key={m._id}
          >
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>{m.sender.name}</Tooltip>}
              >
                <img
                  src={m.sender.pic}
                  alt={m.sender.name}
                  className="rounded-circle me-2"
                  width="35"
                  height="35"
                />
              </OverlayTrigger>
            )}
            <div
              style={{
                backgroundColor:
                  m.sender._id === user._id ? "#44b1f0ff" : "#2bef76ff",
                borderRadius: "20px",
                padding: "8px 15px",
                maxWidth: "75%",
                marginBottom: "5px",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 1 : 6,
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
    </div>
  );
}

export default ScrollableChat;
