import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Link, useLinkClickHandler } from 'react-router-dom';
import Home from './pages/Home';
import {Navbar,Nav,Container} from 'react-bootstrap';
import  Recipe  from './pages/Recipe'
import { Profile } from './pages/Profile'
import ShoppingList from './pages/ShoppingList'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <h1 class='text-center'>PrepPal</h1>
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme='dark' >
            <Container>
              <Navbar.Brand as={Link} to={'/Home'}>PrepPal</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to='/Home'>Home</Nav.Link>
                  <Nav.Link as={Link} to='/Recipe' >Recipe</Nav.Link>
                  <Nav.Link as={Link} to='/ShoppingList' >Shopping List</Nav.Link>
                  <Nav.Link class='' as={Link} to='/Profile' ></Nav.Link>
                </Nav>
                <Nav>
              <Nav.Link>
              SignIn/SignUp
            </Nav.Link>
          </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className="container">
            <Routes>
              <Route path='/Home' element={<Home/>}/>
              <Route path='/Recipe' element={<Recipe/>}/>
              <Route path='/Profile' element={<Profile/>}/>
              <Route path='/ShoppingList' element={<ShoppingList/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
