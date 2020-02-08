import React, { useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import AppIcon from '../images/monkey-icon.png'
import axios from 'axios'
import { Link } from 'react-router-dom'

// MUI Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto'
    },
    pageTitle: {
        margin: '10px auto'
    },
    textField: {
        margin: '10px auto'
    },
    button: {
        marginTop: '20px',
        marginBottom: '10px'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: '10px'
    },
    progress: {
        position: 'absolute',
    }
}

export const Login = props => {

    const [userData, setUserData] = useState({email: '', password: ''})
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
 

    const handleSubmit = (event) => {
        // preventDefault - so page doesn't reload
        event.preventDefault()
        setLoading(false)
        
        axios.post('/login', userData)
            .then(res => {
                console.log(res.data)
                setLoading(false)
                // props.history.push - redirects back to homepage
                props.history.push('/')
            })
            .catch(err => {
                setErrors(err.response.data)
                setLoading(false)
            })
    }

    const handleChange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value})
    }


    const { classes } = props

    return (
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm>
                <img src={AppIcon} alt="monkey icon" className={classes.image} />
                <Typography variant="h2" className={classes.page1}>Login</Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField 
                        id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email ? true : false}        
                        onChange={handleChange} 
                        fullWidth
                    />
                    <TextField 
                        id="password" 
                        name="password" 
                        type="password" 
                        label="Password" 
                        className={classes.textField}
                        helperText={errors.password}
                        error={errors.password ? true : false}             
                        onChange={handleChange} 
                        fullWidth
                    />
                    {/* checks if general error exist - display general error */}
                    {errors.general && <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>}

                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        disabled={loading}
                    >
                        Login
                        {/* if loading - display CircularProgress spinner */}
                        {loading && <CircularProgress size={30} color="secondary" className={classes.progress} />}
                    </Button>

                    <br />

                    <small>Don't have an account? Sign up <Link to="/signup">here</Link></small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    )
}

export default withStyles(styles)(Login)
