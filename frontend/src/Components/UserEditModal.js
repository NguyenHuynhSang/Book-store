import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Store from '../Store';
import { toast } from 'react-toastify';

const editUserReducer = (state, action) => {
  switch (action.type) {
    case 'Update_REQ':
      return { ...state, loading: true };
    case 'Update_SUCC':
      return { ...state, loading: false };
    case 'Update_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default function UserEditModal({ setShowModel, show, userE }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { loggedUser } = state;
  const [userEdit, setUserEdit] = useState(userE);
  const [name, setName] = useState(userEdit.name);
  const [username, setUsername] = useState(userEdit.username);
  const [email, setEmail] = useState(userEdit.email);
  const [role, setRole] = useState(userEdit.role);
  const [seller, setSeller] = useState(userEdit.seller);

  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');

  const [newPassword, setPassword] = useState('');
  //hard code role
  const roles = ['Admin', 'User'];
  //First, we initialize our event
  const event = new Event('onDialogClose');
  const [{ loading }, dispatch] = useReducer(editUserReducer, {
    loading: false,
  });
  const handleClose = () => {
    setShowModel(false);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(userEdit);
    try {
      const { data } = await axios.put(
        `/api/user/${userEdit._id}`,
        {
          name,
          email,
          role,
          newPassword,
          seller,
        },
        { headers: { Authorization: `Bearer ${loggedUser.token}` } }
      );
      dispatch({
        type: 'Update_SUCC',
      });
      toast('Save success');
    } catch (error) {}
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

            <Form.Group className="mb-3" controlId="password">
              <Form.Label> New password:</Form.Label>
              <Form.Control
                value={newPassword}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="role">
              <Form.Label> Role</Form.Label>
              <Form.Control
                as="select"
                required
                onChange={(e) => setRole(e.target.value)}
              >
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

            {userEdit.role === 'seller' && (
              <div>
                <h2>Seller Infor</h2>

                <Form.Group className="mb-3" controlId="comfirmPassword">
                  <Form.Label>Seller name</Form.Label>
                  <Form.Control
                    placeholder="Enter Seller Name"
                    value={seller.name}
                    onChange={(e) =>
                      setSeller({ ...seller, name: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="comfirmPassword">
                  <Form.Label>Seller Logo</Form.Label>
                  <Form.Control
                    placeholder="Seller Logo"
                    onChange={(e) =>
                      setSeller({ ...seller, logo: e.target.value })
                    }
                    value={seller.logo}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="comfirmPassword">
                  <Form.Label>Seller Description</Form.Label>
                  <Form.Control
                    placeholder="Seller Logo"
                    onChange={(e) => setSellerDescription(e.target.value)}
                    value={seller.description}
                  ></Form.Control>
                </Form.Group>
              </div>
            )}
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
