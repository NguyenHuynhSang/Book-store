import React, { useContext, useEffect, useReducer, useState } from 'react';
import MessageBox from '../../Components/MessageBox';
import Loading from '../../Components/Loading';
import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import {
  DELETE_RESET,
  USER_DELETE,
  USER_LIST_FAIL,
  USER_LIST_SUCC,
  userListReducer,
} from '../../Reducers/UserReducer';
import Store from '../../Store';
import { toast } from 'react-toastify';
import { getOverlayDirection } from 'react-bootstrap/esm/helpers';
import GetError from '../../utils';
import UserEditModal from '../../Components/UserEditModal';

export default function UserListPage() {
  const [{ loading, error, users, deletedUser, isDeleted }, dispatch] =
    useReducer(userListReducer, {
      users: [],
      loading: true,
      error: '',
    });

  const [showEditModel, setShowEditModel] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { loggedUser } = state;
  const [filter, setFilter] = useState('');
  const [filterProp, setFilterProp] = useState('username');
  const filterProperty = ['username', 'email', 'id', 'role'];

  const handleEditModal = (user) => {
    console.log('open edit modal');
    setShowEditModel(true);
    setUserEdit(user);
  };

  useEffect(() => {
    console.log('fetch User list');

    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/user/list', {
          headers: { Authorization: `Bearer ${loggedUser.token}` },
          params: {
            filter: filter,
            filterProp: filterProp,
          },
        });
        console.log(filter);
        // console.log(data);
        dispatch({ type: USER_LIST_SUCC, payload: data });
      } catch (error) {
        const err = GetError(error);
        console.log(err);
        toast.error(err);
      }
    };
    fetchData();
  }, [isDeleted, filter, filterProp, showEditModel]);
  const deleteUser = async (x) => {
    console.log('call delete');
    console.log(x);
    if (
      window.confirm('Do you want to delete this user? userName: ' + x.username)
    ) {
      try {
        const { data } = await axios.delete(`/api/user/delete/${x._id}`, {
          headers: { Authorization: `Bearer ${loggedUser.token}` },
        });

        dispatch({ type: USER_DELETE, payload: data });
        toast.success('User ' + deleteUser.username + ' has been deleted');
        if (isDeleted) {
          dispatch({ type: DELETE_RESET });
        }
      } catch (error) {
        const err = GetError(error);
        console.log(err);
        toast.error(err);
      }
    }
  };
  const selectFilterHandler = (e) => {
    e.preventDefault();
    console.log('select');
    console.log(e.target.value);
    setFilterProp(e.target.value);
  };
  return (
    <div>
      <h1>User</h1>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div>
          {showEditModel ? (
            <UserEditModal
              show={showEditModel}
              setShowModel={setShowEditModel}
              userE={userEdit}
            ></UserEditModal>
          ) : (
            ''
          )}
          <Form.Group
            as={Row}
            className="mb-4 box-container"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="1">
              Filter
            </Form.Label>
            <Col sm="1">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => selectFilterHandler(e)}
              >
                {filterProperty.map((f) => (
                  <option value={f}>{f}</option>
                ))}
              </Form.Select>
            </Col>
            <Col sm="8">
              <Form.Control
                type="text"
                onChange={(e) => setFilter(e.target.value)}
                placeholder="filter text"
              />
            </Col>
            <Col sm="1">
              <Button>Reset</Button>
            </Col>
          </Form.Group>
          <table className="table box-container">
            <thead>
              <tr>
                <th>ID</th>
                <th>UserName</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users?.map((x) => (
                <tr key={x._id}>
                  <td>{x._id}</td>
                  <td>{x.username}</td>
                  <td>{x.name}</td>
                  <td>{x.email}</td>
                  <td>{x.role}</td>
                  <td>
                    <Button onClick={() => handleEditModal(x)}>Edit</Button>
                    <Button onClick={() => deleteUser(x)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
