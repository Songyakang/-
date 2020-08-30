module.exports = {
  devServer: {
    port: 80
  }
}
console.log(Object.is(process.env.NODE_ENV, 'production'), process.env.NODE_ENV)