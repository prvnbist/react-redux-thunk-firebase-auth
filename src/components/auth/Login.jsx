import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
    signIn,
    signInWithTwitter,
    signInWithGoogle,
} from '../../store/actions/authActions'

const Login = ({
    signIn,
    history,
    auth,
    signInWithTwitter,
    signInWithGoogle,
}) => {
    const [email, setEmail] = useState('prvnbist@gmail.com')
    const [password, setPassword] = useState('123456')

    const handleChange = e => {
        if (e.target.id === 'email') {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        const creds = { email, password }
        signIn(creds, history)
    }
    return (
        <div>
            {auth && <span>{auth}</span>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    value={password}
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button>Login</button>
            </form>
            <button onClick={() => signInWithTwitter(history)}>twitter</button>
            <button onClick={() => signInWithGoogle(history)}>Google</button>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth.authError,
})

const mapDispatchToProps = dispatch => ({
    signIn: (credentials, history) => dispatch(signIn(credentials, history)),
    signInWithTwitter: history => dispatch(signInWithTwitter(history)),
    signInWithGoogle: history => dispatch(signInWithGoogle(history)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Login))
