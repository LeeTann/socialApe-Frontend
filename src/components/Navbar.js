import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import MyButton from '../utils/MyButton'
import PostScream from './scream/PostScream'

// MUI Stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

// MUI Icon
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'

const Navbar = (props) => {
    const { authenticated } = props
    return (
        <AppBar>
            <Toolbar className="nav-container">
                {authenticated ? (
                    <Fragment>            
                        <PostScream />
                        <Link to="/">
                            <MyButton tip="Home">
                                <HomeIcon />
                            </MyButton>
                        </Link>
                        <MyButton tip="Notifications">
                            <Notifications />
                        </MyButton>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    </Fragment>
                )}
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
