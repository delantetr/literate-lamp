import React from 'react';
import { Button, Form, Card } from 'react-bootstrap';

const Login = () => {
  return (
    <main className='flex-row justify-center mb-4'>
      <div className='mt-5'>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            {/* Card Title */}
            <Card.Title>Login</Card.Title>

            {/* Login Form */}
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                {/* You can add any additional text or labels here */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
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
