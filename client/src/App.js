import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Link, useLinkClickHandler } from 'react-router-dom';
import Home from './Components/Home';
import {Navbar,Nav,Container} from 'react-bootstrap';


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme='dark' >
            <Container>
              <Navbar.Brand as={Link} to={'/Home'}>PrepPal</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to='/Home'>Home</Nav.Link>
                  <Nav.Link as={Link} to='/Profile' >Profile</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className="container">
            <Routes>
              <Route path="/Home" element={<Home/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
