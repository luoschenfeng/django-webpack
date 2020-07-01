const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const merge = require('lodash/merge')
const env = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../env/.env')))
let localEnv = {}

if (fs.existsSync(path.resolve(__dirname, '../env/.env.local'))) {
  localEnv = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../env/.env.local')))
}


function mergeEnv() {
  const mode = process.env.BUILD_ENV ? process.env.BUILD_ENV : process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
  let envObj = merge(env, localEnv, dotenv.parse(fs.readFileSync(path.resolve(__dirname, `../env/.env.${mode}`))))

  let processEnvObj = {}
  for (const k in envObj) {
    processEnvObj[`process.env.${k}`] = JSON.stringify(envObj[k])
  }
  return processEnvObj
}

let webpackEnvConfig = mergeEnv()



module.exports = webpackEnvConfig
