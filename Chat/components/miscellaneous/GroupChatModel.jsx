import React, { useState } from "react";
import { Button, Modal, Form, CloseButton } from "react-bootstrap";
import { toast } from "react-toastify";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

function GroupChatModel({ children }) {
  const [showEntry, setShowEntry] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResult([]);
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:1000/api/user?search=${query}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("Failed to Load the Chats", {
        position: "bottom-center",
        autoClose: 2000,
      });
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length === 0) {
      toast.warning("Please fill all the fields", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:1000/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      setShowEntry(false);
      toast.success("New Group Chat Created", {
        position: "top-center",
        duration: 2000,
      });
    } catch (error) {
      toast.error("Failed to create group chat", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.some((u) => u._id === userToAdd._id)) {
      toast.warning("User Already Added", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
    setSearch("");
    setSearchResult([]);
  };

  const handleDelete = (userToDelete) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== userToDelete._id));
  };

  const handleEntryOpen = () => setShowEntry(true);
  const handleEntryClose = () => {
    setShowEntry(false);
    setSelectedUsers([]);
    setGroupChatName("");
    setSearch("");
    setSearchResult([]);
  };

  return (
    <>
      <span onClick={handleEntryOpen} style={{ cursor: "pointer" }}>
        {children}
      </span>

      <Modal show={showEntry} onHide={handleEntryClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Group Chat</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Chat Name"
            className="mb-3"
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
          />
          <Form.Control
            type="text"
            placeholder="Add users e.g: John Doe"
            className="mb-3"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <div className="d-flex flex-wrap mb-3">
            {selectedUsers.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleDelete(u)}
              />
            ))}
          </div>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            searchResult
              .slice(0, 4)
              .map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleEntryClose}>
            Close
          </Button>
          <Button onClick={handleSubmit} variant="primary">
            Create Group
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GroupChatModel;
