import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_USER, SET_UNAUTHENTICATED, MARK_NOTIFICATIONS_READ } from '../types'
import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) => {
    // dispatch an action type!
    dispatch({ type: LOADING_UI })
    console.log("userdata", userData)
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

export const signupUser = (userData, history) => (dispatch) => {
    // dispatch an action type!
    dispatch({ type: LOADING_UI })
    axios
        .post('/signup', userData)
        .then(res => {
            console.log("from singup userActions", res.data)
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

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken')
    delete axios.defaults.headers.common['Authorization']
    dispatch({ type: SET_UNAUTHENTICATED })
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

export const uploadImage = (FormData) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    
    axios.post('/user/image', FormData)
        .then(() => {
            dispatch(getUserData())
        })
        .catch(err => console.log(err))
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER })

    axios.post('/user', userDetails)
        .then(() => {
            dispatch(getUserData())
        })
        .catch(err => console.log(err))
}

export const markNotificationsRead = (notificationIds) => (dispatch) => {
    axios.post('/notifications', notificationIds)
        .then((res) => {
            dispatch({
                type: MARK_NOTIFICATIONS_READ
            })
        })
        .catch(err => console.log(err))
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', FBIdToken)
    axios.defaults.headers.common['Authorization'] = FBIdToken
  }