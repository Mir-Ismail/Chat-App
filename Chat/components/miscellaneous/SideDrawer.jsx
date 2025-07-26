import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { FaSearch, FaBell } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import {
  Offcanvas,
  Button,
  Form,
  Spinner,
  Image,
  ListGroup,
  Toast,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import { toast } from "react-toastify";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import ChatLoading from "./ChatLoading";

function SideDrawer() {
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const navigate = useNavigate();

  const [showDrawer, setShowDrawer] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) {
      toast.warning("Please enter something to search", {
        position: "top-left",
        autoClose: 2000,
      });
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
        `http://localhost:1000/api/user?search=${search}`,
        config
      );
      console.log("Search result response:", data); // <== ADD THIS
      setSearchResult(data);
    } catch (error) {
      toast.error("Failed to load search results", {
        position: "top-left",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userinfo");
    navigate("/");
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:1000/api/chat/",
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
      handleDrawerClose();
    } catch (error) {
      toast.error("Error Fetching the Chat", {
        position: "bottom-left",
        autoClose: 5000,
      });
      setLoadingChat(false);
    }
  };

  const handleDrawerOpen = () => setShowDrawer(true);
  const handleDrawerClose = () => setShowDrawer(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow">
        <a className="navbar-brand fw-bold" href="#">
          Chat App
        </a>

        <div className="ms-auto me-4 d-flex align-items-center gap-2">
          <Button
            variant="outline-success"
            size="sm"
            onClick={handleDrawerOpen}
          >
            <FaSearch className="me-2" />
            Search Users
          </Button>

          <FaBell size={20} className="me-3" />

          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              bsPrefix="p-0 border-0 bg-transparent"
            >
              <Image
                src={user.pic}
                alt={user.name}
                className="rounded-circle"
                width="35"
                height="35"
                style={{ cursor: "pointer" }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <ProfileModal user={user}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </ProfileModal>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>

      {/* Drawer */}
      <Offcanvas show={showDrawer} onHide={handleDrawerClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search Users</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form.Control
            type="text"
            placeholder="Search by name or email"
            className="mb-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="primary"
            className="w-100 mb-3"
            onClick={handleSearch}
          >
            Search
          </Button>

          {loading ? (
            <ChatLoading />
          ) : (
            <ListGroup variant="flush">
              {searchResult.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => {
                    accessChat(user._id);
                  }}
                />
              ))}
            </ListGroup>
          )}
          {loadingChat && <Spinner ml="auto" d="flex" />}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideDrawer;
