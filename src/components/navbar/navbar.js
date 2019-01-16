import React, { Fragment } from 'react'
import { Navbar, NavbarBrand, Nav, NavLink, NavbarToggler, NavItem, Collapse } from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'
import UserContext from '../../conext/UserContext'

export default class Example extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/" className="mr-auto">
          My Base Project
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <UserContext.Consumer>
            {({ isAuthenticated, onLogout }) => (
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? (
                  <NavItem onClick={onLogout}>Logout</NavItem>
                ) : (
                  <Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>
                        <NavLink>Signup</NavLink>
                      </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>
                        <NavLink>Login</NavLink>
                      </NavItem>
                    </LinkContainer>
                  </Fragment>
                )}
              </Nav>
            )}
          </UserContext.Consumer>
        </Collapse>
      </Navbar>
    )
  }
}
