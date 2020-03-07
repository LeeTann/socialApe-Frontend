import React from 'react'
import MyButton from '../../utils/MyButton'
import { Link } from 'react-router-dom'

// Redux
import { connect } from 'react-redux'
import { likeScream, unlikeScream } from '../../redux/actions/dataActions'

// Icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

const LikeButton = (props) => {

    const likedScream = () => {
        console.log("user.likes", props)
        if (props.user.likes && props.user.likes.find(like => like.screamId === props.screamId)) {
            return true
        } else {
            return false
        }
    }

    const likeScream = () => {
        props.likeScream(props.screamId)
    }

    const unlikeScream = () => {
        props.unlikeScream(props.screamId)
    }

    const { authenticated } = props.user
    const likeButton = !authenticated ? (
        <MyButton tip="Like">
            <Link to="/login">
                <FavoriteBorder color="primary" />
            </Link>
        </MyButton>
    ) : (
        likedScream() ? (
            <MyButton tip="Unlike" onClick={unlikeScream}>
                <FavoriteIcon color="primary" />
            </MyButton> 
        ) : (
            <MyButton tip="Like" onClick={likeScream}>
                <FavoriteBorder color="primary" />
            </MyButton> 
        )
    )
    return (
        <div>
            {likeButton}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)