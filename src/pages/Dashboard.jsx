import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { Layout, Spin, Avatar } from 'antd'

const Dashboard = ({ profile, auth }) => {
    return (
        <Layout className="content">
            {profile.isLoaded ? (
                <React.Fragment>
                    <header id="dashboard__header">
                        {profile.image ? (
                            <Avatar size={64} src={profile.image} />
                        ) : (
                            <Avatar
                                size={64}
                                style={{
                                    background: '#7e3cf4',
                                }}
                            >
                                {profile.name[0]}
                                {profile.name.split(' ')[1][0]}
                            </Avatar>
                        )}
                        <div>
                            <h2>{profile.name}</h2>
                            <span>@{profile.username}</span>
                        </div>
                    </header>
                </React.Fragment>
            ) : (
                <Spin />
            )}
        </Layout>
    )
}

const mapStateToProps = state => ({
    profile: state.firebase.profile,
    auth: state.firebase.auth,
})

export default connect(mapStateToProps)(withRouter(Dashboard))
