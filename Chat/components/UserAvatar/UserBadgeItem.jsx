import React from "react";
import Badge from "react-bootstrap/Badge";
import { CloseButton } from "react-bootstrap";

function UserBadgeItem({ user, handleFunction }) {
  return (
    <Badge
      pill
      bg="primary"
      className="d-flex align-items-center m-1"
      style={{ cursor: "pointer" }}
      onClick={handleFunction}
    >
      {user.name}
      <CloseButton
        variant="white"
        className="ms-2"
        style={{ fontSize: "0.6rem" }}
        onClick={handleFunction}
      />
    </Badge>
  );
}

export default UserBadgeItem;
