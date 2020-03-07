import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import MyButton from '../../utils/MyButton'
import LikeButton from './LikeButton'
import DeleteScream from './DeleteScream'

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

// MUI Icon
import ChatIcon from '@material-ui/icons/Chat'

// Redux
import { connect } from 'react-redux'
import { likeScream, unlikeScream } from '../../redux/actions/dataActions'

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    }, 
    image: {
        minWidth: 200,
        backgroundPosition: 'top ',
    },
    content: {
        padding: 25,
    },
}

const Screams = props => {

    dayjs.extend(relativeTime)
    const { 
        classes, 
        scream: {body, createAt, userImage, userHandle, screamId, likeCount, commentCount},
        user: {authenticated, credentials: {handle}}
    } = props
    
    const deleteButton = authenticated && userHandle === handle ? <DeleteScream screamId={screamId} /> : null

    return (
        <Card className={classes.card}>
            <CardMedia image={userImage} title="Profile image" className={classes.image} />
            <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary" >{userHandle}</Typography>
                {deleteButton}
                <Typography variant="body2" color="textSecondary" >{dayjs(createAt).fromNow()}</Typography>
                <Typography variant="body1" >{body}</Typography>
                <LikeButton screamId={screamId} />
                <span>{likeCount} Likes</span>
                <MyButton tip="comments">
                    <ChatIcon color="primary" />
                </MyButton>
                <span>{commentCount} comments</span>
            </CardContent>
        </Card>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Screams))
