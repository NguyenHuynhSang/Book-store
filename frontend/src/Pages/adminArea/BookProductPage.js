import React, { useContext, useEffect } from 'react';
import Loading from '../../Components/Loading';
import MessageBox from '../../Components/MessageBox';
import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import Store from '../../Store';
import GetError from '../../utils';
import { toast } from 'react-toastify';

export default function BookProductPage() {
  const x = '';
  const error = '';
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { loggedUser } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/user/list', {
          headers: { Authorization: `Bearer ${loggedUser.token}` },
        });

        // console.log(data);
      } catch (error) {
        const err = GetError(error);
        console.log(err);
        toast.error(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Book Products</h1>
      {false ? (
        <Loading></Loading>
      ) : false ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div>
          <Form.Group
            as={Row}
            className="mb-4 box-container"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="1">
              Filter
            </Form.Label>
            <Col sm="1">
              <Form.Select aria-label="Default select example"></Form.Select>
            </Col>
            <Col sm="8">
              <Form.Control type="text" placeholder="filter text" />
            </Col>
            <Col sm="1">
              <Button>Reset</Button>
            </Col>
          </Form.Group>
          <table className="table box-container">
            <thead>
              <tr>
                <th>ID</th>

                <th>Book Name</th>
                <th>Author</th>
                <th>Create Date</th>
                <th>Status</th>
                <th>Count in stock</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr key={x._id}>
                <td>{x._id}</td>
                <td>{x.username}</td>
                <td>{x.name}</td>
                <td>{x.email}</td>
                <td>{x.role}</td>
                <td>{x.role}</td>
                <td>
                  <Button>Detail</Button>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
