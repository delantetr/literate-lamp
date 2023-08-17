import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  // Destructure the addUser mutation and response data
  const [login, { error, data }] = useMutation(LOGIN);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('Form State:', formState);

    try {
      const { data } = await login({
        variables: { ...formState },
      });
      console.log('Login Mutation Data:', data);

      Auth.login(data.login.token);
    } catch (e) {
      console.error('Login Mutation Error:', e);
    }
  };

  console.log('Rendering Login Component');
  
  return (
    <main className='flex-row justify-center mb-4'>
      <div className='mt-5'>
        {data ? (
          <p>
            Success! You may now head{' '}
            <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    id="pwd"
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

export default Login;
