import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import {
    signIn,
    signInWithTwitter,
    signInWithGoogle,
} from '../store/actions/auth'

import { Form, Icon, Input, Button, Row, Col, Layout, Alert } from 'antd'

const Login = ({
    signIn,
    history,
    error,
    signInWithTwitter,
    signInWithGoogle,
    form,
    auth,
    location,
    deleted,
}) => {
    const handleSubmit = e => {
        e.preventDefault()
        form.validateFields((err, values) => {
            if (!err) {
                const creds = { email: values.email, password: values.password }
                signIn(creds, history)
            }
        })
    }
    const { getFieldDecorator } = form
    if (auth.uid) {
        return (
            <Redirect
                to={{
                    pathname: '/dashboard',
                    state: { from: location },
                }}
            />
        )
    }
    return (
        <Layout className="content">
            <h2>Login</h2>
            {deleted && (
                <Alert
                    message={deleted}
                    type="error"
                    showIcon
                    style={{ marginBottom: '16px' }}
                />
            )}
            <Row id="components-form-demo-normal-login">
                {error && <span>{error}</span>}
                <Col>
                    <Form onSubmit={handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ],
                                initialValue: '',
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{
                                                color: 'rgba(0,0,0,.25)',
                                            }}
                                        />
                                    }
                                    placeholder="Email"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ],
                                initialValue: '',
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{
                                                color: 'rgba(0,0,0,.25)',
                                            }}
                                        />
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    type="default"
                    className="social__login"
                    id="social__login__twitter"
                    onClick={() => signInWithTwitter(history)}
                >
                    <span>Sign in with </span>
                    <Icon type="twitter" />
                </Button>
                <Button
                    type="default"
                    className="social__login"
                    id="social__login__google"
                    onClick={() => signInWithGoogle(history)}
                >
                    <span>Sign in with </span>
                    <Icon type="google" />
                </Button>
            </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    error: state.auth.authError,
    auth: state.firebase.auth,
    deleted: state.profile.success,
})

const mapDispatchToProps = dispatch => ({
    signIn: (credentials, history) => dispatch(signIn(credentials, history)),
    signInWithTwitter: history => dispatch(signInWithTwitter(history)),
    signInWithGoogle: history => dispatch(signInWithGoogle(history)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Form.create({ name: 'normal_login' })(Login)))
