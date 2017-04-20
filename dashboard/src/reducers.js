import {USERS_SIGN_IN, USERS_SIGN_OUT, SIDE_BAR_TOGGLE, STATUS_BAR_TOGGLE} from './actions'
import jwtDecode from 'jwt-decode'


const currentUser = (state={}, action) => {
  switch(action.type){
    case USERS_SIGN_IN:
      try{
        return jwtDecode(action.token)
      }catch(e){
        console.log(e)
      }
      return {}
    case USERS_SIGN_OUT:
      return {}
    default:
      return state
  }
}

const sideBar = (state={open: false}, action) => {
  switch(action.type){
    case SIDE_BAR_TOGGLE:
      return Object.assign({}, {open: !state.open})
    default:
      return state;
  }
}


const statusBar = (state={open: false, message: ''}, action) => {
  switch(action.type){
    case STATUS_BAR_TOGGLE:
      var msg = action.message
      return Object.assign({}, {open: msg!=null, message: msg==null?'':msg})
    default:
      return state;
  }
}

export default {
  currentUser,
  sideBar,
  statusBar
}
