import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { Button, Icon, Spin } from 'antd'

import { signOut } from '../store/actions/auth'

const Navbar = ({ profile, signOut, history }) => {
    return (
        <nav>
            <div id="logo">
                <Link to="/">
                    <Icon type="fire" />
                </Link>
            </div>
            {!profile.isLoaded ? (
                <Spin />
            ) : (
                <div id="nav__items">
                    {!profile.isEmpty ? (
                        <Button type="danger" onClick={() => signOut(history)}>
                            Logout
                        </Button>
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
