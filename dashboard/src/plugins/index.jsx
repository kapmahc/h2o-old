import auth from './auth'
import site from './site'
// import reading from './reading'
// import forum from './forum'

const plugins = {
  auth,  
  site,
  // forum,
  // reading,
}

export default {
  nonSignInLinks:  [
    {
      to: "/users/sign-in",
      label: "auth.users.sign-in.title",
      icon: "security"
    },
    {
      to: "/users/sign-up",
      label: "auth.users.sign-up.title",
      icon: "person_add"
    },
    {
      to: "/users/forgot-password",
      label: "auth.users.forgot-password.title",
      icon: "find_replace"
    },
    {
      to: "/users/confirm",
      label: "auth.users.confirm.title",
      icon: "confirmation_number"
    },
    {
      to: "/users/unlock",
      label: "auth.users.unlock.title",
      icon: "lock_open"
    },
    null,
    {
      to: "/leave-words/new",
      label: "site.leave-words.new.title",
      icon: "bug_report"
    }
  ],
  dashboard(user) {
    return Object.keys(plugins).reduce((a, k) => {
      return a.concat(plugins[k].dashboard(user))
    }, [])
  },
  routes: Object.keys(plugins).reduce((a, k) => {
    return a.concat(plugins[k].routes)
  }, [])
};
