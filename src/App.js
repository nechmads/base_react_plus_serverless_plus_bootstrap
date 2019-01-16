import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import Navbar from './components/navbar/navbar'
import Routes from './Routes'
import { withRouter } from 'react-router-dom'
import UserContext from './conext/UserContext'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      isAuthenticated: false,
      isAuthenticating: true,
    }
  }

  async componentDidMount() {
    try {
      await Auth.currentSession()
      this.userHasAuthenticated(true)
    } catch (e) {
      if (e !== 'No current user') {
        alert(e)
      }
    }

    this.setState({ isAuthenticating: false })
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated })
  }

  handleLogout = async event => {
    await Auth.signOut()

    this.userHasAuthenticated(false)

    this.props.history.push('/login')
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    }

    return (
      !this.state.isAuthenticating && (
        <div className="App container">
          <UserContext.Provider
            value={{
              user: this.state.user,
              isAuthenticated: this.state.isAuthenticated,
              onLogout: this.handleLogout,
              onLogin: this.userHasAuthenticated,
            }}
          >
            <Navbar />
            <Routes childProps={childProps} />
          </UserContext.Provider>
        </div>
      )
    )
  }
}

export default withRouter(App)
