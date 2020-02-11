import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_USER } from '../types'
import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) => {
    // dispatch an action type!
    dispatch({ type: LOADING_UI })
    console.log("userdatat", userData)
    axios
        .post('/login', userData)
        .then(res => {
            console.log("from login userActions", res.data)
            setAuthorizationHeader(res.data.token)
            dispatch(getUserData())
            dispatch({ type: CLEAR_ERRORS })
            // props.history.push - redirects back to homepage
            history.push('/')
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER })

    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', FBIdToken)
    axios.defaults.headers.common['Authorization'] = FBIdToken
  }