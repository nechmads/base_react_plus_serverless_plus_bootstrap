import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import { Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap'
import LoaderButton from '../../components/LoaderButton/LoaderButton'
import UserContext from '../../conext/UserContext'
import './SignUp.css'

export default class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      newUser: null,
    }
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    )
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    this.setState({ isLoading: true })

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
      })
      this.setState({
        newUser,
      })
    } catch (e) {
      alert(e.message)
    }

    this.setState({ isLoading: false })
  }

  handleConfirmationSubmit = async (event, onLogin) => {
    event.preventDefault()

    this.setState({ isLoading: true })

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode)
      await Auth.signIn(this.state.email, this.state.password)

      onLogin(true)
      this.props.history.push('/')
    } catch (e) {
      alert(e.message)
      this.setState({ isLoading: false })
    }
  }

  renderConfirmationForm() {
    return (
      <UserContext.Consumer>
        {({ onLogin }) => (
          <Form>
            <FormGroup>
              <Label>Confirmation Code</Label>
              <Input
                id="confirmationCode"
                autoFocus
                type="tel"
                value={this.state.confirmationCode}
                onChange={this.handleChange}
              />
              <FormFeedback>Please check your email for the code.</FormFeedback>
            </FormGroup>
            <LoaderButton
              block
              disabled={!this.validateConfirmationForm()}
              isLoading={this.state.isLoading}
              text="Verify"
              loadingText="Verifying…"
              onClick={e => {
                this.handleConfirmationSubmit(e, onLogin)
              }}
            />
          </Form>
        )}
      </UserContext.Consumer>
    )
  }

  renderForm() {
    return (
      <Form>
        <FormGroup>
          <Label>Email</Label>
          <Input autoFocus id="email" type="email" value={this.state.email} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input id="password" value={this.state.password} onChange={this.handleChange} type="password" />
        </FormGroup>
        <FormGroup>
          <Label>Confirm Password</Label>
          <Input id="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} type="password" />
        </FormGroup>
        <LoaderButton
          color="primary"
          block
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
          onClick={this.handleSubmit}
        />
      </Form>
    )
  }

  render() {
    return (
      <div className="Signup">{this.state.newUser === null ? this.renderForm() : this.renderConfirmationForm()}</div>
    )
  }
}
