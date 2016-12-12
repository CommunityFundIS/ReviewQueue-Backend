import _ from 'lodash'

//All root endpoint routes and files
// const routes = ['submission','auth']
const routes = ['submission']

//Setup each route

for(let routeName of routes) {
  //Require the route endpoint file
  const route = require(`./routes/${routeName}`)

  //Set up all the sub-routes /route/sub or /file/method
  for(let endpoint of Object.keys(route)){
    //The final name will be routes.methodEndpoint. It is important to use the
    //same name that is used in serverles.yml
    const exportName = `${endpoint}${_.upperFirst(routeName)}`
    exports[exportName] = route[endpoint]
  }
}
