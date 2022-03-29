const { defineConfig } = require('@vue/cli-service');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const deps = require("./package.json");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.VUE_APP_REMOTES === 'local' ?
   // DEVELOPMENT
    'http://localhost:9797/' :
    // PRODUCTION
    'https://module-federation-mfe-login.herokuapp.com',
  devServer: { port: 9797 },
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'MfeLogin',
        filename: 'remoteEntry.js',
        remotes: process.env.VUE_APP_REMOTES === 'local' ?
          // DEVELOPMENT
          {
            ModuleAuth: 'ModuleAuth@http://localhost:9898/remoteEntry.js',
          } :
          // PRODUCTION
          {
            ModuleAuth: 'ModuleAuth@https://module-federation-module-auth.herokuapp.com/remoteEntry.js'
          },
        exposes: {
           './MfeLogin': './src/bootstrap.js' 
        },
        shared: {
          ...require('./package.json').dependencies,
          vue: {
            singleton: true,
          },
          'element-plus': {
            singleton: true
          }
        },
      })
    ]
  }
})