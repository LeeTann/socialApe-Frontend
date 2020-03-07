import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import EditDetails from '../profile/EditDetails'
import MyButton from '../../utils/MyButton'

// Redux 
import { connect } from 'react-redux'
import { logoutUser, uploadImage } from '../../redux/actions/userActions'

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'

//MUI Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'


const styles = (theme) => ({
  ...theme.spreadThis
})

const Profile = (props) => {

    //  the first file and allow us to upload a new image
    const handleImageChange = (event, props) => {
        const image = event.target.files[0]
        const formData = new FormData()
        formData.append('image', image, image.name)
        props.uploadImage(formData)
    }
    
    // opens up the fileInput to select an image on click
    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
    }

    const handleLogout = () => {
      props.logoutUser()
    }

    const {
        classes,
        user: {
            credentials: { handle, createdAt, imageUrl, bio, website, location },
            loading,
            authenticated
        }
    } = props
    
    // if it's not loading check if authenticated
    let profileMarkup = !loading ? (authenticated ? (
        // if authenticated - display profile section
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image" />
                    <input type="file" id="imageInput" hidden="hidden" onChange={handleImageChange} />
                    <MyButton tip="Edit profile picture" onClick={handleEditPicture} btnClassName="button">
                        <EditIcon color="primary" />
                    </MyButton>
                </div>
                <hr/>
                <div className="profile-details">
                    <MuiLink component={Link} to={`/user/${handle}`} color="primary" variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr/>
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr/>
                    {location && (
                        <Fragment>
                            <LocationOn color="primary"/> <span>{location}</span> <hr/>
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color="primary"/>
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                {' '}{website}
                            </a>
                            <hr/>
                        </Fragment>
                    )}
                    <CalendarToday color="primary"/>{' '}<span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
                <MyButton tip="Logout" onClick={handleLogout}>
                    <KeyboardReturn color="primary" />
                </MyButton>
                <EditDetails />
            </div>
        </Paper>
    ) : (
        // else we are not authenticated - display "No profile found, please login again"
        <Paper className={classes.paper}>
            <Typography variant="body2" align="center">
                No profile found, please login again
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="seconary" component={Link} to="/signup">
                        Signup
                    </Button>
                </div>
            </Typography>
        </Paper>
    // else display "loading..."
    )) : (<p>loading...</p>)

    return profileMarkup
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionToProps = { logoutUser, uploadImage }

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Profile))