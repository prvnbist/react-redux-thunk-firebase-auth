import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { firebase } from './config/fbConfig'

import store from './store/store'

import 'antd/dist/antd.css'
import './styles/index.scss'

import Navbar from './components/Navbar'
import { Layout, Icon } from 'antd'

import PrivateRoute from './utils/PrivateRoute'

const Home = lazy(() => import('./components/Home'))
const Dashboard = lazy(() => import('./components/Dashboard'))
const Login = lazy(() => import('./components/auth/Login'))
const SignUp = lazy(() => import('./components/auth/SignUp'))

const rrfProps = {
    firebase,
    config: {
        userProfile: 'users',
        useFirestoreForProfile: true,
    },
    dispatch: store.dispatch,
    createFirestoreInstance,
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
                <div id="wrapper">
                    <Navbar />
                    <Suspense
                        fallback={
                            <Layout>
                                <Icon type="loading" />
                            </Layout>
                        }
                    >
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <PrivateRoute
                                path="/dashboard"
                                component={Dashboard}
                            />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={SignUp} />
                            <Route
                                path="*"
                                render={() => <Redirect to="/" />}
                            />
                        </Switch>
                    </Suspense>
                </div>
            </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
)
