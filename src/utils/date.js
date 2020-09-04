const formatTime = (date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') => {
  format = format.replace(/(YYYY|yyyy)/, date.getFullYear()).replace(/MM/, date.getMonth() + 1).replace(/(DD|dd)/, date.getUTCDate()).replace(/(HH|hh)/, date.getHours()).replace(/mm/, date.getMinutes()).replace(/(SS|ss)/, date.getSeconds())
  return format
}
const countdown = (date, format = 'HH:mm:ss') => {
  format = format.replace(/(HH|hh)/, parseInt(date / 3600 / 24).toString().padStart(2, 0)).replace(/(mm)/, parseInt(date % 3600 / 60).toString().padStart(2, 0)).replace(/(ss|SS)/, parseInt(date % 60).toString().padStart(2, 0))
  return format
}
module.exports = {
  formatTime: formatTime,
  countdown
}