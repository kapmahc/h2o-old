import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect, Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import i18n from 'i18next'

import {signIn} from './actions'
import {TOKEN} from './constants'
import plugins from './plugins'

import NoMatch from './components/NoMatch'
import Home from './components/Home'

class Widget extends Component{
  componentDidMount() {
    const { signIn } = this.props
    var token = sessionStorage.getItem(TOKEN)
    if (token){
      signIn(token)
    }
    document.title = `${i18n.t('site.subTitle')}-${i18n.t('site.title')}`;
  }
  render () {
    const {store, history} = this.props
    return (<Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={Home}/>
            {plugins.routes.map((r, i) => {
              return (<Route path={r.path} component={r.component} key={i} />)
            })}
            <Route component={NoMatch}/>
          </Switch>
        </div>
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
