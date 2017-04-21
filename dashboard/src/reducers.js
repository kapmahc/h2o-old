import {USERS_SIGN_IN, USERS_SIGN_OUT} from './actions'
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

export default {
  currentUser
}
