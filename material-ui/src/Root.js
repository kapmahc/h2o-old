import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect, Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import i18n from 'i18next'

import {signIn} from './actions'
import {TOKEN} from './constants'

import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import Header from './components/Header'
import SideBar from './components/SideBar'
import StatusBar from './components/StatusBar'
import NoMatch from './components/NoMatch'
import plugins from './plugins'

class Widget extends Component{
  componentDidMount() {
    const { signIn } = this.props
    var token = sessionStorage.getItem(TOKEN)
    if (token){
      signIn(token)
    }
    document.title = i18n.t('site.title')
  }
  render () {
    const {store, history} = this.props
    return (<Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider>
          <div>
            <Header />
            <SideBar />
            <div className="container">
              <div className="row">
                <Switch>
                  <Route exact path="/" component={Home}/>
                  {plugins.routes.map((r, i) => {
                    return (<Route path={r.path} component={r.component} key={i} />)
                  })}
                  <Route component={NoMatch}/>
                </Switch>
              </div>
              <div className="row" style={{margin: "3rem auto"}}>
                <Dashboard/>
              </div>
            </div>
            <Footer />
            <StatusBar />
          </div>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>)
  }
}

Widget.propTypes = {
  signIn: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default connect(
  state => ({}),
  {signIn},
)(Widget);
