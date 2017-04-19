import auth from './auth'
// import site from './site'
// import blog from './blog'
// import reading from './reading'
// import forum from './forum'

const plugins = {
  // forum,
  // reading,
  // site,
  auth
}

export default {
  dashboard: Object.keys(plugins).map((k, i) => {
    return plugins[k].dashboard
  }, []),  
  routes: Object.keys(plugins).reduce((a, k) => {
    return a.concat(plugins[k].routes)
  }, [])
};
