export const getTime = () => {
  let message = ''
  let hour = new Date().getHours()
  if (hour <= 9) {
    return (message = 'Hi,早上好！')
  } else if (hour < 12) {
    return (message = 'Hi,上午好！')
  } else if (hour <= 13) {
    return (message = 'Hi,中午好！')
  } else if (hour <= 19) {
    return (message = 'Hi,下午好！')
  } else {
    return (message = 'Hi,晚上好！')
  }
}
