import React, { Fragment, useState, useEffect } from 'react'
import MyButton from '../../utils/MyButton'

// Redux
import { connect } from 'react-redux'
import { postScream, clearErrors } from '../../redux/actions/dataActions'

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
// MUI icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    }
})

const PostScream = (props) => {
    const [userData, setUserData] = useState({body:'', open: false, errors: {}})
    // const [body, setBody] = useState('')
    // const [open, setOpen] = useState(false)
    // const [errors, setErrors] = useState({})

    useEffect(() => {
        console.log("props......", props)
        if (props.UI.errors) {
            setUserData(props.UI.errors)
        }
    }, [props])

    useEffect(() => {
        if (!props.UI.errors && !props.UI.loading) {
            setUserData({body:'', open: false, errors: {}})
        }
    }, [props.UI.errors, props.UI.loading])


    const handleOpen = () => {
        setUserData({ open: true })
    }

    const handleClose = () => {
        props.clearErrors()
        setUserData({body:'', open: false, errors: {}})
    }

    const handleChange = (event) => {
        setUserData({
            ...userData, [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.postScream({ body: userData.body })   
    }
   

    const { classes, UI: {loading}} = props
    return (
        <Fragment>
            <MyButton onClick={handleOpen} tip="Post a scream!">
                <AddIcon />
            </MyButton>
            <Dialog open={userData.open} onClose={handleClose} fullWidth maxWidth="sm">
                <MyButton onClick={handleClose} tip="Close" tipClassName={classes.closeButton}>
                    <CloseIcon />
                </MyButton>
                <DialogTitle>Post a new scream</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="body"
                            type="text"
                            label="SCREAM!!!"
                            multiline
                            row="3"
                            placeholder="Scream at your fellow apes"
                            error={userData.body ? true: false}
                            helperText={userData.body}
                            className={classes.TextField}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                            disabled={loading}
                        >
                            Submit
                            {loading && (<CircularProgress size={30} className={classes.progressSpinner} />)}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream))