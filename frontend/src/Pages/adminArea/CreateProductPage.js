import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
export default function CreateProductPage() {
  const navigate = useNavigate();
  return (
    <div className="">
      <Card style={{ width: '140rem', margin: 'auto' }}>
        <Card.Body>
          <Form>
            <h2>Create New Book</h2>

            <hr></hr>
            <Row>
              <Col sm={8}>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Book Name</Form.Label>
                  <Form.Control size="lg" as="textarea" rows={2} />
                </Form.Group>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Seo URL</Form.Label>
                  <Form.Control disabled />
                </Form.Group>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Thumbnail</Form.Label>
                  <Form.Control />
                </Form.Group>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control size="lg" as="textarea" rows={5} />
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Count In stock</Form.Label>
                    <Form.Control type="number" />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Dimensions</Form.Label>
                    <Form.Control />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Language</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Number of Pages</Form.Label>
                    <Form.Control />
                  </Form.Group>
                </Row>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Category</Form.Label>
                  <Form.Control t placeholder="Categories" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Author</Form.Label>
                  <Form.Control placeholder="Select Author" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Publisher</Form.Label>
                  <Form.Control placeholder="Select Publisher" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Publish date</Form.Label>
                  <Form.Control placeholder="Date" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button>Submit</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
