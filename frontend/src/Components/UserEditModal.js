import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function UserEditModal(props) {
  const [userEdit, setUserEdit] = useState(props.userEdit);
  const [show, setShow] = useState(props.show);
  const [name, setName] = useState(userEdit.name);
  const [username, setUsername] = useState(userEdit.username);
  const [email, setEmail] = useState(userEdit.email);
  const [role, setRole] = useState(userEdit.role);
  //First, we initialize our event
  const event = new Event('onDialogClose');

  const submitHandler = (e) => {};
  return (
    <div>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User: {userEdit.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1 className="mb-3">User Infor</h1>
          <form onSubmit={(e) => submitHandler(e)}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label> Username</Form.Label>
              <Form.Control
                value={username}
                disabled={true}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label> Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label> Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label> Role</Form.Label>
              <Form.Control
                value={userEdit.role}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <div className="mb-3">
              <Button type="submit">Update</Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
