module.exports = {
  lintOnSave: 'error',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/i,
          use: 'raw-loader',
        },
      ],
    },
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].url = "https://demonology.agate.blue/"
        args[0].description = "An incremental game about souls harvesting and growing evil."
        return args
      })
  }
}
