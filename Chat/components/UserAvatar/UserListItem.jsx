import React from "react";
import { Image } from "react-bootstrap";
// import "./UserListItem.css"; // Optional: add styles below or inline

function UserListItem({ user, handleFunction }) {
  return (
    <div
      className="d-flex align-items-center px-3 py-2 mb-2 user-list-item"
      onClick={handleFunction}
      style={{
        cursor: "pointer",
        backgroundColor: "#88e9f1ff",
        borderRadius: "10px",
        transition: "background 0.2s",
      }}
    >
      <Image
        src={user.pic}
        roundedCircle
        width={40}
        height={40}
        className="me-3"
        alt={user.name}
      />
      <div>
        <strong>{user.name}</strong>
        <div className="text-muted" style={{ fontSize: "0.85rem" }}>
          Email: {user.email}
        </div>
      </div>
    </div>
  );
}

export default UserListItem;
