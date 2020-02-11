import React, { Component }from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import themeFile from './utils/Theme'
import jwtDecode from 'jwt-decode'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'

//MUI
import { MuiThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'

// Components
import Navbar from './components/Navbar'
import AuthRoute from './utils/AuthRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'


const myTheme = createMuiTheme(themeFile)

let authenticated
const token = localStorage.FBToken
if (token) {
  const decodeToken = jwtDecode(token)
  if (decodeToken.exp * 1000 < Date.now()) {
    window.location.href = "/login"
    authenticated = false
  } else {
    authenticated = true
  }
}

class App extends Component {
  render() {
      return (
        <Provider store={store}>
          <MuiThemeProvider theme={myTheme}>       
            <div className="App">
              <Router>
                <Navbar />
                <div className="container">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <AuthRoute exact path="/login" component={Login} authenticated={authenticated} />
                    <AuthRoute exact path="/signup" component={Signup} authenticated={authenticated} />
                  </Switch>
                </div>           
              </Router>
            </div>       
          </MuiThemeProvider>
        </Provider>
      )
  }
}

export default App
