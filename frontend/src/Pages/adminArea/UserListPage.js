import React, { useContext, useEffect, useReducer } from 'react';
import MessageBox from '../../Components/MessageBox';
import Loading from '../../Components/Loading';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {
  USER_DELETE,
  USER_LIST_FAIL,
  USER_LIST_SUCC,
  userListReducer,
} from '../../Reducers/UserReducer';
import Store from '../../Store';
import { toast } from 'react-toastify';
import { getOverlayDirection } from 'react-bootstrap/esm/helpers';
import GetError from '../../utils';

export default function UserListPage() {
  const [{ loading, error, users, deletedUser, isDeleted }, dispatch] =
    useReducer(userListReducer, {
      users: [],
      loading: true,
      error: '',
    });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { loggedUser } = state;

  useEffect(() => {
    console.log('fetch User list');
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/user/list', {
          headers: { Authorization: `Bearer ${loggedUser.token}` },
        });
        console.log(data);
        dispatch({ type: USER_LIST_SUCC, payload: data });
      } catch (error) {
        console.log(GetError(error));
      }
    };
    fetchData();
  }, [isDeleted]);
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
      } catch (error) {
        console.log(GetError(error));
      }
    }
  };
  return (
    <div>
      <h1>User</h1>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <table className="table">
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
                  <Button>Edit</Button>
                  <Button onClick={() => deleteUser(x)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
