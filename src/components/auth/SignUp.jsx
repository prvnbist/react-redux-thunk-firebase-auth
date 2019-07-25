import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
    signUp,
    signInWithTwitter,
    signInWithGoogle,
} from '../../store/actions/authActions'
import { withRouter } from 'react-router-dom'

const SignUp = ({ signUp, history, signInWithTwitter, signInWithGoogle }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = e => {
        if (e.target.id === 'name') {
            setName(e.target.value)
        } else if (e.target.id === 'email') {
            setEmail(e.target.value.trim())
        } else {
            setPassword(e.target.value.trim())
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        const creds = { email, password, name }
        signUp(creds, history)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    id="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                />
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
                    required
                />
                <button>SignUp</button>
            </form>
            <button onClick={() => signInWithTwitter(history)}>twitter</button>
            <button onClick={() => signInWithGoogle(history)}>Google</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (newUser, history) => dispatch(signUp(newUser, history)),
        signInWithTwitter: history => dispatch(signInWithTwitter(history)),
        signInWithGoogle: history => dispatch(signInWithGoogle(history)),
    }
}

export default connect(
    null,
    mapDispatchToProps
)(withRouter(SignUp))
