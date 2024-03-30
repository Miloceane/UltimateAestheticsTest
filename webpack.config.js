module.exports = {
  externals: {
     // tell `webpack` to resolve `vue` from root (window)
     vue: "Vue",
  },
  devServer: {
     // ...
     // might have to turn of this option since it throws error
     // not sure where it comes from though :(
     hot: false,
  }
}