import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import SingleChat from "./SingleChat";

function Chatbox({ fetchAgain, setFetchAgain }) {
  const { selectedChat } = ChatState();

  return (
    <div
      className={`bg-white border rounded p-0 d-flex flex-column ${
        selectedChat ? "d-flex" : "d-none d-md-flex"
      }`}
      style={{
        width: "68%",
        height: "100%",
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
}

export default Chatbox;
