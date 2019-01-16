import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import LoaderButton from '../../components/LoaderButton/LoaderButton'
import { Auth } from 'aws-amplify'
import UserContext from '../../conext/UserContext'
import './login.css'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      email: '',
      password: '',
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleSubmit = async (event, onLogin) => {
    event.preventDefault()

    this.setState({ isLoading: true })

    try {
      await Auth.signIn(this.state.email, this.state.password)
      onLogin(true)
      this.props.history.push('/')
    } catch (e) {
      alert(e.message)
      this.setState({ isLoading: false })
    }
  }

  render() {
    return (
      <div className="Login">
        <UserContext.Consumer>
          {({ onLogin }) => (
            <Form>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  autoFocus
                  id="email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <LoaderButton
                block
                disabled={!this.validateForm()}
                onClick={e => this.handleSubmit(e, onLogin)}
                isLoading={this.state.isLoading}
                text="Login"
                loadingText="Logging in…"
                color="primary"
              />
            </Form>
          )}
        </UserContext.Consumer>
      </div>
    )
  }
}
