import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Layout, Spin, Avatar, Button } from 'antd'

const Dashboard = ({ profile, auth }) => {
    return (
        <Layout className="content" id="dashboard">
            {profile.isLoaded ? (
                <React.Fragment>
                    <header style={{ marginBottom: '16px' }}>
                        {profile.image || auth.photoURL ? (
                            <Avatar
                                size={64}
                                src={profile.image || auth.photoURL}
                            />
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
                            {profile.username && (
                                <span>@{profile.username}</span>
                            )}
                        </div>
                    </header>
                    <main>
                        <Link to="/edit-profile">
                            <Button type="default" size={'small'}>
                                Edit Profile
                            </Button>
                        </Link>
                    </main>
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
