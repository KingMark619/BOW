let date = new Date()
let time = date.getHours()
let day = date.getDate()
let mon = date.getMonth()
let month = mon + 1
let year = date.getFullYear()

if (day.toString().length === 1){
  day = '0' + day
}
else {
  day = day
}
if (month.toString().length === 1){
  month= '0' + month
}
else {
  month = month
}

let fullDate = day + '/' + month + '/' + year
export default fullDate