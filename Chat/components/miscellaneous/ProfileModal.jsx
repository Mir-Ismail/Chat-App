import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ProfileModal({ user, children }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Trigger element */}
      {children ? (
        <span onClick={handleShow} style={{ cursor: "pointer" }}>
          {children}
        </span>
      ) : (
        <i
          className="fa fa-eye"
          onClick={handleShow}
          style={{ cursor: "pointer" }}
        ></i>
      )}

      {/* Bootstrap Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{user?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={user?.pic}
            alt={user?.name}
            className="rounded-circle mb-3"
            width="120"
            height="120"
          />
          <h5>{user?.name}</h5>
          <p className="text-muted">{user?.email}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileModal;
