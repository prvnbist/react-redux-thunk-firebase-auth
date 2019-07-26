import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { Button, Icon } from 'antd'

import { signOut } from '../store/actions/authActions'

const Navbar = ({ profile, signOut, history }) => {
    return (
        <nav>
            <div id="logo">
                <Link to="/">
                    <Icon type="fire" />
                </Link>
            </div>
            {!profile.isLoaded ? (
                <Icon type="loading" />
            ) : (
                <div id="nav__items">
                    {!profile.isEmpty ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {profile.image ? (
                                <img
                                    src={profile.image}
                                    alt={profile.name}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: '#7e3cf4',
                                        color: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {profile.name[0]}
                                    {profile.name.split(' ')[1][0]}
                                </div>
                            )}
                            <Button
                                type="danger"
                                onClick={() => signOut(history)}
                            >
                                Logout
                            </Button>
                        </div>
                    ) : null}
                </div>
            )}
        </nav>
    )
}

const mapStateToProps = state => ({
    profile: state.firebase.profile,
})

const mapDispatchToProps = dispatch => ({
    signOut: history => dispatch(signOut(history)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Navbar))
