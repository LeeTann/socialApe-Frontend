import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Screams from '../components/Screams'
import Profile from '../components/profile/Profile'

import { Grid } from '@material-ui/core'

const Home = props => {

    const [screams, setScreams] = useState(null)

    useEffect(() => {
        axios.get('/screams')
        .then(res => {
            setScreams(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    // if the screams are there then load each scream. else display loading
    let recentScreamsMarkup = screams ? screams.map(scream => <Screams key={scream.screamId} scream={scream} />) : <p>Loading...</p>

    return (
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                {recentScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile/>
            </Grid>
        </Grid>           
    )
}

export default Home
