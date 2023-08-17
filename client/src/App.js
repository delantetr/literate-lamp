import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Recipe from './pages/Recipe';
import Profile from './pages/Profile';
import ShoppingList from './pages/ShoppingList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Auth from './utils/auth'

// Apollo Client setup
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


function App() {
  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          {/* Main Header */}
          <h1 className='text-center'>PrepPal</h1>
          
          {/* Navbar */}
          <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme='dark'>
            <Container>
              <Navbar.Brand as={Link} to={'/'}>PrepPal</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to='/'>Home</Nav.Link>
                  <Nav.Link as={Link} to='/recipe'>Recipes</Nav.Link>
                  <Nav.Link as={Link} to='/shoppinglist'>Shopping List</Nav.Link>
                  
                </Nav>

                {Auth.loggedIn() ? (
                  <Nav>
                    <Nav.Link as={Link} to='/me'>Profile</Nav.Link>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  </Nav>
                ) : (
                  <Nav>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                  </Nav>
                )};
                
              </Navbar.Collapse>
            </Container>
          </Navbar>

          {/* Content */}
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/recipe' element={<Recipes />} />
              <Route path='/recipe/:recipeId' element={<Recipe />} />
              <Route path='/me' element={<Profile />} />
              <Route path='/shoppingList' element={<ShoppingList />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
