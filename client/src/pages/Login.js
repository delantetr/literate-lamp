import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';




const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <main className='flex-row justify-center mb-4'>
      <div className='mt-5'>
        <div className='container' class='m-3'>
        <Link to='/signup'>← Go to Signup</Link>
        </div>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            {/* Card Title */}
            <Card.Title>Login</Card.Title>

            {/* Login Form */}
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" id="email" placeholder="Enter email" onChange={handleChange} />
                {/* You can add any additional text or labels here */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" id="pwd" placeholder="Password" onChange={handleChange}/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </main>
  );
}

export default Login;
