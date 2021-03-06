import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Spin } from 'antd'

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    if (auth.isLoaded) {
        return (
            <Route
                {...rest}
                render={props =>
                    auth.isEmpty === false ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: { from: props.location },
                            }}
                        />
                    )
                }
            />
        )
    } else {
        return (
            <Layout className="content">
                <Spin />
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
