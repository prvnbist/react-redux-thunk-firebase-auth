import React from 'react'
import { connect } from 'react-redux'

import Login from './auth/Login'
import SignUp from './auth/SignUp'

import { Layout, Tabs, Icon } from 'antd'

const { TabPane } = Tabs

const Home = ({ auth }) => {
    return (
        <Layout>
            {auth.isLoaded ? (
                <Tabs tabPosition={'bottom'}>
                    <TabPane tab="Login" key="1">
                        <Login />
                    </TabPane>
                    <TabPane tab="Sign Up" key="2">
                        <SignUp />
                    </TabPane>
                </Tabs>
            ) : (
                <Icon type="loading" />
            )}
        </Layout>
    )
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
})

export default connect(mapStateToProps)(Home)
