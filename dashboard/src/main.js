import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { Route } from 'react-router'

import reducers from './reducers'

const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

import {SignIn, SignUp} from './plugins/auth/users'

function main() {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          layout
          <br/>
          <Route path="/users/sign-in" component={SignIn}/>
          <Route path="/users/sign-up" component={SignUp}/>
        </div>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  )
}

export default main
