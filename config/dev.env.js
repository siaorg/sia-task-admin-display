var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // http://sia-task-config-dev:10615/ui/menuList
  CESHI_API_HOST: "'sia-task-config-dev:10615'",
  CESHI_API_HOST_LOG: "'sia-task-config-dev:5601'"
})
