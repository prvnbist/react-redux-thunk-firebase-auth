import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import {
    Layout,
    Spin,
    Form,
    Input,
    Icon,
    Tag,
    Button,
    Alert,
    PageHeader,
} from 'antd'

import { updateProfile, deleteProfile } from '../store/actions/profile'

const EditProfile = ({
    profile,
    auth,
    form,
    updateProfile,
    deleteProfile,
    errors,
    success,
    status,
    history,
}) => {
    const handleSubmit = e => {
        e.preventDefault()
        form.validateFields(async (err, values) => {
            if (!err) {
                if (
                    profile.email !== values.email ||
                    profile.username !== values.username ||
                    profile.email !== values.email ||
                    profile.bio !== values.bio
                )
                    updateProfile(values)
            }
        })
    }
    const { getFieldDecorator } = form
    return (
        <Layout className="content" id="edit__profile">
            {profile.isLoaded ? (
                <React.Fragment>
                    <header>
                        <PageHeader
                            onBack={() => history.push('/dashboard')}
                            title="Edit Profile"
                        />
                        {profile.provider === 'google' && (
                            <Tag color="red">Google</Tag>
                        )}
                        {profile.provider === 'twitter' && (
                            <Tag color="blue">Twitter</Tag>
                        )}
                    </header>
                    <main>
                        {errors.username && (
                            <Alert
                                message={errors.username}
                                type="error"
                                showIcon
                                style={{ marginBottom: '16px' }}
                            />
                        )}
                        {errors.email && (
                            <Alert
                                message={errors.email}
                                type="error"
                                showIcon
                                style={{ marginBottom: '16px' }}
                            />
                        )}
                        {success && (
                            <Alert
                                message={success}
                                type="success"
                                showIcon
                                style={{ marginBottom: '16px' }}
                            />
                        )}

                        <Form
                            onSubmit={handleSubmit}
                            className="login-form"
                            layout={'vertical'}
                        >
                            <Form.Item label="Full name">
                                {getFieldDecorator('name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your name!',
                                        },
                                    ],
                                    initialValue: profile.name || '',
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
                                        placeholder="Enter your full name"
                                        disabled={
                                            profile.provider === 'twitter' ||
                                            profile.provider === 'google'
                                        }
                                    />
                                )}
                            </Form.Item>
                            <Form.Item label="Username">
                                {getFieldDecorator('username', {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                'Please input your username!',
                                        },
                                    ],
                                    initialValue: profile.username || '',
                                })(
                                    <Input
                                        prefix={
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#b3b3b3"
                                                strokeWidth="1"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <circle cx="12" cy="12" r="4" />
                                                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                                            </svg>
                                        }
                                        placeholder="Enter your username"
                                        disabled={
                                            profile.provider === 'twitter'
                                        }
                                    />
                                )}
                            </Form.Item>
                            <Form.Item label="Email">
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                    ],
                                    initialValue:
                                        profile.email || auth.email || '',
                                })(
                                    <Input
                                        prefix={
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#b3b3b3"
                                                strokeWidth="1"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                <polyline points="22,6 12,13 2,6" />
                                            </svg>
                                        }
                                        placeholder="Enter your email"
                                        disabled={profile.provider === 'google'}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item label="Bio">
                                {getFieldDecorator('bio', {
                                    initialValue: profile.bio || '',
                                })(
                                    <Input
                                        prefix={
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#b3b3b3"
                                                strokeWidth="1"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                                                <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                                            </svg>
                                        }
                                        placeholder="Enter your bio..."
                                    />
                                )}
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={status.update === null ? false : true}
                                style={{
                                    background: status.update
                                        ? '#31CB29'
                                        : '#1890FF',
                                }}
                            >
                                {status.update || 'Update profile'}
                            </Button>
                            <Button
                                type="danger"
                                style={{ marginLeft: '16px' }}
                                loading={status.delete === null ? false : true}
                                onClick={() => deleteProfile(history)}
                            >
                                {status.delete || 'Delete profile'}
                            </Button>
                        </Form>
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
    errors: state.profile.failure,
    success: state.profile.success,
    status: state.profile.status,
})
const mapDispatchToProps = dispatch => ({
    updateProfile: details => dispatch(updateProfile(details)),
    deleteProfile: history => dispatch(deleteProfile(history)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Form.create({ name: 'normal_login' })(EditProfile)))
