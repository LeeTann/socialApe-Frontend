import React, { useState, Fragment } from 'react'
import MyButton from '../../utils/MyButton'

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'

// MUI icons
import DeleteOutline from '@material-ui/icons/DeleteOutline'

// Redux
import { connect } from 'react-redux'
import { deleteScream } from '../../redux/actions/dataActions'

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
}

const DeleteScream = (props) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const deleteScream = () => {
        props.deleteScream(props.screamId)
        setOpen(false)
    }

    const { classes } = props

    return (
        <Fragment>
            <MyButton onClick={handleOpen} tip="Delete Scream" btnClassName={classes.deleteButton}>
                <DeleteOutline color="secondary" />
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullwidth maxWidth="sm">
                <DialogTitle>
                    Are you sure you want to delete this scream?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteScream} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps, {deleteScream})(withStyles(styles)(DeleteScream))