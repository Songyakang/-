module.exports = {
  devServer: {
    port: 8080
  }
}
console.log(Object.is(process.env.NODE_ENV, 'production'), process.env.NODE_ENV)