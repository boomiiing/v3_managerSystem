export const getTime = () => {
  let hour = new Date().getHours()
  if (hour <= 9) {
    return ('Hi,早上好！')
  } else if (hour < 12) {
    return ( 'Hi,上午好！')
  } else if (hour <= 13) {
    return ('Hi,中午好！')
  } else if (hour <= 19) {
    return ('Hi,下午好！')
  } else {
    return ( 'Hi,晚上好！')
  }
}
