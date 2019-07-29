import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { firebase } from './config/firebase-config'

import store from './store/store'

import 'antd/dist/antd.css'
import './styles/index.scss'

import Navbar from './components/Navbar'
import { Layout, Spin } from 'antd'

import PrivateRoute from './components/PrivateRoute'

const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const EditProfile = lazy(() => import('./pages/EditProfile'))

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
                            <Layout className="content">
                                <Spin />
                            </Layout>
                        }
                    >
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <PrivateRoute
                                path="/dashboard"
                                component={Dashboard}
                            />
                            <PrivateRoute
                                path="/edit-profile"
                                component={EditProfile}
                            />
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
