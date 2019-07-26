import React from 'react'
import { connect } from 'react-redux'
import {
    signUp,
    signInWithTwitter,
    signInWithGoogle,
} from '../../store/actions/authActions'
import { withRouter } from 'react-router-dom'

import { Layout, Form, Icon, Input, Button, Row, Col } from "antd";
const SignUp = ({ signUp, history, signInWithTwitter, signInWithGoogle, form, auth }) => {

    const handleSubmit = e => {
		e.preventDefault();
	    form.validateFields((err, {email,password,name,username}) => {
			if (!err) {
				const creds = { email, password, name, username }
                signUp(creds, history)
			}
		});
    };
    const { getFieldDecorator } = form;
    return (
        <Layout>
				<h2>Signup</h2>
				<Row id="components-form-demo-normal-login">
					{auth && (
						<span>{auth}</span>
					)}
					<Col>
						<Form
							onSubmit={handleSubmit}
							className="signup-form"
						>
							<Form.Item>
								{getFieldDecorator("name", {
									rules: [
										{
											required: true,
											message: "Fullname is required!"
										}
									]
								})(
									<Input
										prefix={
											<Icon
												type="smile"
												style={{
													color: "rgba(0,0,0,.25)"
												}}
											/>
										}
										placeholder="Full name"
									/>
								)}
							</Form.Item>
							<Form.Item>
								{getFieldDecorator("username", {
									rules: [
										{
											required: true,
											message: "Username is required!"
										}
									]
								})(
									<Input
										prefix={
											<Icon
												type="number"
												style={{
													color: "rgba(0,0,0,.25)"
												}}
											/>
										}
										placeholder="Username"
									/>
								)}
							</Form.Item>
							<Form.Item>
								{getFieldDecorator("email", {
									rules: [
										{
											required: true,
											message: "Please input your email!"
										}
									]
								})(
									<Input
										prefix={
											<Icon
												type="user"
												style={{
													color: "rgba(0,0,0,.25)"
												}}
											/>
										}
										placeholder="Email"
									/>
								)}
							</Form.Item>
							<Form.Item>
								{getFieldDecorator("password", {
									rules: [
										{
											required: true,
											message:
												"Please input your Password!"
										}
									]
								})(
									<Input
										prefix={
											<Icon
												type="lock"
												style={{
													color: "rgba(0,0,0,.25)"
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
                    onClick={() => signInWithTwitter(history)}
                    style={{
                        width: '48%',
                        textAlign: 'unset',
                        border: '1px solid #1da1f2',
                    }}
                >
                    <span>Sign in with </span>
                    <Icon
                        type="twitter"
                        style={{
                            float: 'right',
                            marginTop: '3px',
                            color: '#1da1f2',
                        }}
                    />
                </Button>
                <Button
                    type="default"
                    onClick={() => signInWithGoogle(history)}
                    style={{
                        width: '48%',
                        textAlign: 'unset',
                        border: '1px solid #dd4b39',
                    }}
                >
                    <span>Sign in with </span>
                    <Icon
                        type="google"
                        style={{
                            float: 'right',
                            marginTop: '3px',
                            color: '#dd4b39',
                        }}
                    />
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
)(withRouter(Form.create({ name: "normal_login" })(SignUp)))
