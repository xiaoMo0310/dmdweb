'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"http://localhost:8090"'
  BASE_API: '"http://192.168.0.246:8090"'
})
