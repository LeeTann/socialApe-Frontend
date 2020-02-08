import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route {...rest} render={(props) => {
        return authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }} 
    />
)

export default AuthRoute