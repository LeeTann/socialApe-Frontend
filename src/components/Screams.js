import React from 'react'
import { Link } from 'react-router-dom'
import dayjs, { locale } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import withStyles from '@material-ui/core/styles/withStyles'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

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
    const { classes, scream: {body, createAt, userImage, userHandle, screamId, likeCount, commentCount} } = props

    return (
        <Card className={classes.card}>
            <CardMedia image={userImage} title="Profile image" className={classes.image} />
            <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary" >{userHandle}</Typography>
                <Typography variant="body2" color="textSecondary" >{dayjs(createAt).to(dayjs('Feb 1, 2020 8:00 PM'))}</Typography>
                <Typography variant="body1" >{body}</Typography>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(Screams)
