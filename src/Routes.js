import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/home/home'
import NotFoundPage from './pages/404/404'
import Login from './pages/login/login'
import Signup from './pages/signUp/SignUp'
import AppliedRoute from './components/AppliedRoute/AppliedRoute'

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFoundPage} />
  </Switch>
)
