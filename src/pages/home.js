import React, { Component } from 'react'
import axios from 'axios'
import Screams from '../components/Screams'

import { Grid } from '@material-ui/core'

export class Home extends Component {
    state = {
        screams: null
    }

    componentDidMount() {
        axios.get('/screams')
            .then(res => {
                console.log(res.data)
                this.setState({
                    screams: res.data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        // if the screams are there then load each scream. else display loading
        let recentScreamsMarkup = this.state.screams ? (this.state.screams.map(scream => <Screams key={scream.screamId} scream={scream} />)) : <p>Loading...</p>
        return (
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile.....</p>
                </Grid>
            </Grid>           
        )
    }
}

export default Home
