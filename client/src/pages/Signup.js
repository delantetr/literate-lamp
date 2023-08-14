import React from 'react';
import { Button, Form, Card } from 'react-bootstrap';

const Signup = () => {
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>Signup</Card.Title>
      <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
    </Card.Body>
  </Card>

  );
}

export default Signup;
