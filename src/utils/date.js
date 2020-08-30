const formatTime = (date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
  format = format.replace(/(YYYY|yyyy)/, date.getFullYear()).replace(/MM/, date.getMonth() + 1).replace(/(DD|dd)/, date.getUTCDate()).replace(/(HH|hh)/, date.getHours()).replace(/mm/, date.getMinutes()).replace(/(SS|ss)/, date.getSeconds())
  return format
}

module.exports = {
  formatTime: formatTime
}