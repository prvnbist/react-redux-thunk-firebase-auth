import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
    signIn,
    signInWithTwitter,
    signInWithGoogle,
} from '../../store/actions/authActions'

import { Form, Icon, Input, Button, Row, Col, Layout } from 'antd'

const Login = ({
    signIn,
    history,
    auth,
    signInWithTwitter,
    signInWithGoogle,
    form,
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
    return (
        <Layout>
            <h2>Login</h2>
            <Row id="components-form-demo-normal-login">
                {auth && <span>{auth}</span>}
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
                    type="primary"
                    onClick={() => signInWithTwitter(history)}
                    style={{ width: '48%', textAlign: 'unset' }}
                >
                    <span>Sign in with </span>
                    <Icon
                        type="twitter"
                        style={{ float: 'right', marginTop: '3px' }}
                    />
                </Button>
                <Button
                    type="danger"
                    onClick={() => signInWithGoogle(history)}
                    style={{ width: '48%', textAlign: 'unset' }}
                >
                    <span>Sign in with </span>
                    <Icon
                        type="google"
                        style={{ float: 'right', marginTop: '3px' }}
                    />
                </Button>
            </div>
        </Layout>
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
)(withRouter(Form.create({ name: 'normal_login' })(Login)))
