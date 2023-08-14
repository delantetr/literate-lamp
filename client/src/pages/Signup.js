import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Destructure the addUser mutation and response data
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='mt-5'>
        {data ? (  // Conditional rendering based on data
          <p>
            Success! You may now head{' '}
            <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Signup</Card.Title>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                  />
                  {/* You can add any additional text or labels here */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}
      </div>
    </main>
  );
}

export default Signup;
