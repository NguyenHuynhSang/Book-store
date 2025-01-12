import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import GetError, { toSeoUrl } from '../../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import Store from '../../Store';

export default function CreateProductPage() {
  const { state, dispatch: dispatch } = useContext(Store);
  const { cart, loggedUser } = state;

  const [validated, setValidated] = useState(false);

  const [bookName, setBookName] = useState('');
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState('/imgs/thumb.png');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [dimensions, setDimensions] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publishDate, setPublishDate] = useState();
  const [language, setLanguage] = useState('');
  const [numPage, setNumPage] = useState(0);
  const [category, setCategory] = useState([]); // selected categories
  const [categories, setCaterories] = useState([]); // store list of category to select
  const [selectedCategories, setSelectedCategories] = useState([]);
  let authors = [];
  let ss = [];
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get('/api/books/categories');
        data.forEach((x) => {
          const val = { value: x, label: x };
          categories.push(val);
        });
      } catch (error) {
        toast.error(GetError(error));
      }
    };
    const fetchAuthors = async () => {
      try {
        const { data } = await axios.get('/api/books/authors');

        const arr = data.map(function (row) {
          return { value: row._id, label: row.name };
        });
        authors = [...arr];
        console.log(arr);
        console.log(authors);
      } catch (error) {
        toast.error(GetError(error));
      }
    };
    fetchCategory();
    fetchAuthors();
  }, []);

  const languages = [
    {
      value: 'EN',
      label: 'ENGLISH',
    },
    {
      value: 'VN',
      label: 'VIETNAM',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];

  const handleCategory = (value) => {
    console.log('run handle');
    const options = value.map(function (row) {
      // This function defines the "mapping behaviour". name and title
      // data from each "row" from your columns array is mapped to a
      // corresponding item in the new "options" array

      return { name: row.value };
    });
    // setCate(options);
    setCategory([]);

    options.forEach((x) => {
      setCategory((category) => [...category, x]);
    });

    console.log(category);
  };

  const HandleSubmit = async (e) => {
    // e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      console.log('validate');
    } else {
      e.preventDefault();
      console.log('cate');
      console.log(category);
      try {
        const { data } = await axios.post(
          '/api/books/create',
          {
            bookName: bookName,
            slug: slug,
            description: description,
            price: price,
            publisher: publisher,
            category: category,
            language: language,
            countInStock: countInStock,
            publishDate: publishDate,
            image: image,
          },
          {
            headers: {
              authorization: `Bearer ${loggedUser.token}`,
            },
          }
        );
        toast('Created: ' + data.name);
        navigate('/products/seller');
      } catch (err) {
        toast(GetError(err));
      }
      return;
    }

    setValidated(true);

    // console.log(selectedCategories);
    // selectedCategories.forEach((x) => {
    //   category.push(x);
    // });
  };
  const setNameUtil = (value) => {
    const url = toSeoUrl(value);
    setBookName(value);
    setSlug(url);
  };
  const navigate = useNavigate();
  return (
    <div className="">
      <Card style={{ width: '140rem', margin: 'auto' }}>
        <Card.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={(e) => HandleSubmit(e)}
          >
            <h2>Create New Book</h2>

            <hr></hr>
            <Row>
              <Col sm={8}>
                <Form.Group className="mb-2" controlId="bookName">
                  <Form.Label>Book Name</Form.Label>
                  <Form.Control
                    onChange={(e) => setNameUtil(e.target.value)}
                    size="lg"
                    required
                    as="textarea"
                    // value={bookName}
                    rows={2}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter book name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Seo URL</Form.Label>

                  <Form.Control disabled value={slug} />
                </Form.Group>
                <Row>
                  <Col sm="4">
                    <img
                      style={{ width: '100%', height: '300px' }}
                      src={image}
                      className="cart-img-top"
                      alt="thumb"
                    ></img>
                  </Col>
                  <Col sm="8">
                    {' '}
                    <Form.Group
                      className="mb-2"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Thumbnail</Form.Label>
                      <Form.Control
                        onChange={(e) => setImage(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter image link
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    size="lg"
                    as="textarea"
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      required
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Count In stock</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      required
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Dimensions</Form.Label>
                    <Form.Control
                      onChange={(e) => setDimensions(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Language</Form.Label>
                    <Select
                      // defaultValue={[languages[0]]}

                      name="languages"
                      options={languages}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Number of Pages</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      onChange={(e) => setNumPage(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Row>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="formCategory">
                  <Form.Label>Category</Form.Label>
                  <Select
                    // defaultValue={[languages[0]]}
                    isMulti
                    name="categories"
                    options={categories}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    required
                    onChange={(e) => handleCategory(e)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Author</Form.Label>
                  <Select
                    // defaultValue={[languages[0]]}
                    isMulti
                    name="authors"
                    options={authors}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Publisher</Form.Label>
                  <Form.Control
                    placeholder="Select Publisher"
                    onChange={(e) => setPublisher(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Publish date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date"
                    onChange={(e) => setPublishDate(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
