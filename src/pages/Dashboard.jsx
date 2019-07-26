import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Layout } from 'antd'

const Dashboard = ({ profile, signOut, history, auth }) => {
    return (
        <Layout className="content">
            {!profile.isEmpty ? (
                <h1>Welcome, {profile.name}</h1>
            ) : (
                <h1>
                    Home, please <Link to="/login">login</Link>!
                </h1>
            )}
        </Layout>
    )
}

const mapStateToProps = state => ({
    profile: state.firebase.profile,
    auth: state.firebase.auth,
})

export default connect(mapStateToProps)(withRouter(Dashboard))
