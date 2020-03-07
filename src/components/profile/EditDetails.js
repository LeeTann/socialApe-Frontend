import React, { Fragment, useState, useEffect } from 'react'
import MyButton from '../../utils/MyButton'

// Redux
import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/actions/userActions'

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

// MUI icons
import EditIcon from '@material-ui/icons/Edit'

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        float: 'right'
    }
})

const EditDetails = (props) => {
    const [userData, setUserData] = useState({bio: '', website: '', location: ''})
    const [open, setOpen] = useState(false)

    useEffect(() => {
        console.log("props",props)
        const { credentials } = props
        mapUserDetailsToState(credentials)
    }, [props])

    const mapUserDetailsToState = (credentials) => {
        setUserData({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        })
    }

    const handleOpen = () => {
        setOpen(true)
        mapUserDetailsToState(props.credentials)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (event) => {
        setUserData({
            ...userData, [event.target.name]: event.target.value
        })
    }

    const handleSubmit = () => {
        const userDetails = {
            bio: userData.bio,
            website: userData.website,
            location: userData.location
        }
        props.editUserDetails(userDetails)
        handleClose()
    }

    const { classes } = props
    return (
        <Fragment>
            <MyButton tip="Edit details" onClick={handleOpen} btnClassName={classes.button}>
                <EditIcon color="primary" />
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit your details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField 
                            name="bio"
                            type="text"
                            label="Bio"
                            multiline
                            rows="3"
                            placeholder="A short bio about yourself"
                            className={classes.textField}
                            value={userData.bio}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField 
                            name="website"
                            type="text"
                            label="Website"
                            placeholder="Your personal/professional website"
                            className={classes.textField}
                            value={userData.website}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField 
                            name="location"
                            type="text"
                            label="Location"
                            placeholder="Where you live"
                            className={classes.textField}
                            value={userData.location}
                            onChange={handleChange}
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails))
