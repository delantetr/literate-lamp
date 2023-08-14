import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import { Profile } from './pages/Profile';
import ShoppingList from './pages/ShoppingList';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Apollo Client setup
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          {/* Main Header */}
          <h1 className='text-center'>PrepPal</h1>
          
          {/* Navbar */}
          <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme='dark'>
            <Container>
              <Navbar.Brand as={Link} to={'/Home'}>PrepPal</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to='/Home'>Home</Nav.Link>
                  <Nav.Link as={Link} to='/Recipe'>Recipe</Nav.Link>
                  <Nav.Link as={Link} to='/ShoppingList'>Shopping List</Nav.Link>
                  <Nav.Link as={Link} to='/Profile'></Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/Signup">Signup</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          {/* Content */}
          <div className="container">
            <Routes>
              <Route path='/Home' element={<Home />} />
              <Route path='/Recipe' element={<Recipe />} />
              <Route path='/Profile' element={<Profile />} />
              <Route path='/ShoppingList' element={<ShoppingList />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/Signup' element={<Signup />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
