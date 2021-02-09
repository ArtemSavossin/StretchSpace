import React from 'react';
import { Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const Header = (props) => {
  return (
    <header>
      <Navbar className='d-flex justify-content-center'>
        <LinkContainer
          to='/'
          style={{
            display: 'flex',
            justifyItems: 'flex-bottom',
            margin: '0 15px',
            alignSelf: 'center',
            textAlign: 'center',
          }}
        >
          <Navbar.Brand>
            <h1>Stretching Space</h1>
          </Navbar.Brand>
        </LinkContainer>
      </Navbar>
    </header>
  );
};

export default Header;
