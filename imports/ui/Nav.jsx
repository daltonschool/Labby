import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


const Navigation = props => (
  <Navbar>
      <Navbar.Header>
          <Navbar.Brand>
              <Link to="/">Labby</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
      </Navbar.Header>

     {props.authenticated &&
     <Navbar.Collapse>
        <Nav pullRight>
            <NavDropdown eventKey={2} title={props.name} id="user-nav-dropdown">
                <LinkContainer to="/profile">
                    <NavItem eventKey={2.1} href="/profile">Profile</NavItem>
                </LinkContainer>
                <MenuItem divider />
                <MenuItem eventKey={2.2} onClick={() => props.history.push('/logout')}>Logout</MenuItem>
            </NavDropdown>
        </Nav>
     </Navbar.Collapse>
     }
  </Navbar>
);

Navigation.defaultProps = {
  name: '',
};

Navigation.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  name: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default withRouter(Navigation);