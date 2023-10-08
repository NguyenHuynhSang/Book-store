import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function UserEditModal({ setShowModel, show, userE }) {
  const [userEdit, setUserEdit] = useState(userE);
  const [name, setName] = useState(userEdit.name);
  const [username, setUsername] = useState(userEdit.username);
  const [email, setEmail] = useState(userEdit.email);
  const [role, setRole] = useState(userEdit.role);
  //hard code role
  const roles = ['Admin', 'User'];
  //First, we initialize our event
  const event = new Event('onDialogClose');
  const handleClose = () => {
    setShowModel(false);
  };
  const submitHandler = (e) => {
    console.log(show);
  };
  return (
    <div>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User: {userEdit.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => submitHandler(e)}>
            <Form.Group className="mb-3" controlId="username">
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
                type="email"
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="role">
              <Form.Label> Role</Form.Label>
              <Form.Control as="select" required>
                {roles.map((r) =>
                  r.toLocaleLowerCase() ===
                  userEdit.role.toLocaleLowerCase() ? (
                    <option value={r} selected>
                      {r}
                    </option>
                  ) : (
                    <option value={r}>{r}</option>
                  )
                )}
              </Form.Control>
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
