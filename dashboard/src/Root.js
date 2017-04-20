import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect, Provider } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton';

import {refresh, signIn} from './actions'
import {get} from './ajax'
import {TOKEN} from './constants'

import Home from './components/Home'
import plugins from './plugins'

class Widget extends Component{
  handleToggle = () => this.setState({open: !this.state.open});
  constructor(props) {
    super(props);
    this.state = {open: false};
  }
  componentDidMount() {
    const { refresh, signIn } = this.props
    var token = sessionStorage.getItem(TOKEN)
    if (token){
      signIn(token)
    }
    get('/site/info').then(
      rst => {
        document.title = rst.title;
        refresh(rst);
      }
    );
  }
  render () {
    const {store, history} = this.props
    return (<Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Title"
              iconClassNameRight="material-exit-to-app"
              onLeftIconButtonTouchTap={this.handleToggle}
            >

            </AppBar>
            <Drawer
              open={this.state.open}
              docked={false}
              >
              <AppBar
                title="AppBar"
                onTouchTap={this.handleToggle}
                />
              <MenuItem>
                <Link to="/users/sign-in">sign in</Link>
              </MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
            </Drawer>
            <div>
              <h1>root</h1>
              <i className="material-icons">face</i>
              <hr/>
              <Route exact path="/" component={Home}/>
              {plugins.routes.map((r, i) => {
                return (<Route path={r.path} component={r.component} key={i} />)
              })}
            </div>

            <div>
              <hr/>
              <footer>
                footer
              </footer>
            </div>
          </div>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>)
  }
}

Widget.propTypes = {
  refresh: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default connect(
  state => ({}),
  {refresh, signIn},
)(Widget);
