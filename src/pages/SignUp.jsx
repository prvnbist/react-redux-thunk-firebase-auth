import React from 'react'
import { connect } from 'react-redux'
import {
    signUp,
    signInWithTwitter,
    signInWithGoogle,
} from '../store/actions/auth'
import { withRouter } from 'react-router-dom'

import { Layout, Form, Icon, Input, Button, Row, Col } from 'antd'
const SignUp = ({
    signUp,
    history,
    signInWithTwitter,
    signInWithGoogle,
    form,
    auth,
}) => {
    const handleSubmit = e => {
        e.preventDefault()
        form.validateFields((err, { email, password, name, username }) => {
            if (!err) {
                const creds = { email, password, name, username }
                signUp(creds, history)
            }
        })
    }
    const { getFieldDecorator } = form
    return (
        <Layout className="content">
            <h2>Signup</h2>
            <Row id="components-form-demo-normal-login">
                {auth && <span>{auth}</span>}
                <Col>
                    <Form onSubmit={handleSubmit} className="signup-form">
                        <Form.Item>
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Fullname is required!',
                                    },
                                ],
                                initialValue: 'Praveen Bisht',
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="smile"
                                            style={{
                                                color: 'rgba(0,0,0,.25)',
                                            }}
                                        />
                                    }
                                    placeholder="Full name"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Username is required!',
                                    },
                                ],
                                initialValue: 'prvnbist',
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="number"
                                            style={{
                                                color: 'rgba(0,0,0,.25)',
                                            }}
                                        />
                                    }
                                    placeholder="Username"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ],
                                initialValue: 'prvnbist@gmail.com',
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
                                initialValue: '1234567',
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
                                Sign up
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
    auth: state.auth.authError,
})

const mapDispatchToProps = dispatch => {
    return {
        signUp: (newUser, history) => dispatch(signUp(newUser, history)),
        signInWithTwitter: history => dispatch(signInWithTwitter(history)),
        signInWithGoogle: history => dispatch(signInWithGoogle(history)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Form.create({ name: 'normal_login' })(SignUp)))
