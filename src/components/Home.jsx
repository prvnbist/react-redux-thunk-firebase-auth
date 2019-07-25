import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const Home = ({ profile, signOut, history }) => {
    return (
        <div>
            {!profile.isEmpty ? (
                <h1>Welcome, {profile.name}</h1>
            ) : (
                <h1>Dashboard</h1>
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    profile: state.firebase.profile,
})

export default connect(mapStateToProps)(withRouter(Home))
