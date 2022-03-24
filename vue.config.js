const { defineConfig } = require('@vue/cli-service');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const deps = require("./package.json");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: 'https://module-federation-mfe-login.herokuapp.com',
  devServer: { port: 9797 },
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'MfeLogin',
        filename: 'remoteEntry.js',
        remotes: {
          ModuleAuth: 'ModuleAuth@https://module-federation-module-auth.herokuapp.com/remoteEntry.js'
        },
        exposes: {
           './MfeLogin': './src/bootstrap.js' // implica wrapper en consumer que use el mount exportado por main
          //'./mainComponent': './src/components/MainComponent.vue'
        },
        shared: {
          vue: {
            // eager: true,
            singleton: true,
            requiredVersion: deps.vue
          },
          // 'element-plus': {
          //   eager: true
          // }
        },
        shared: require('./package.json').dependencies,
      })
    ]
  }
})