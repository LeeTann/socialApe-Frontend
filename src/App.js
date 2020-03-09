import React, { Component }from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import themeFile from './utils/Theme'
import jwtDecode from 'jwt-decode'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { getUserData, loginUser } from './redux/actions/userActions'

//MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

// Components
import Navbar from './components/Navbar'
import AuthRoute from './utils/AuthRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

import axios from 'axios'

axios.defaults.baseURL = 'https://us-central1-socialape-3e674.cloudfunctions.net/api'

const theme = createMuiTheme(themeFile)

const token = localStorage.FBToken
if (token) {
  const decodeToken = jwtDecode(token)
  if (decodeToken.exp * 1000 < Date.now()) {
    store.dispatch(loginUser())
    window.location.href = "/login"
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

class App extends Component {
  render() {
      return (
        <MuiThemeProvider theme={theme}>    
          <Provider store={store}> 
            <div className="App">
              <Router>
                <Navbar />
                <div className="container">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <AuthRoute exact path="/login" component={Login} />
                    <AuthRoute exact path="/signup" component={Signup} />
                  </Switch>
                </div>           
              </Router>
            </div>       
          </Provider>
        </MuiThemeProvider>
      )
  }
}

export default App
