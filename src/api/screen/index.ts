import request from '@/utils/request'
const indexUrl = {
  leftTop: '/bigscreen/countDeviceNum', //左上
  leftCenter: '/bigscreen/countUserNum', //左中
  centerMap: '/bigscreen/centerMap',
  centerBottom: '/bigscreen/installationPlan',

  leftBottom: '/bigscreen/leftBottom', //坐下
  rightTop: '/bigscreen/alarmNum', //报警次数
  rightBottom: '/bigscreen/rightBottom', //右下
  rightCenter: '/bigscreen/ranking', // 报警排名
}

export default indexUrl

/**左上--设备内总览 */
export const countDeviceNum = (param: any = {}) => {
  return request.get(indexUrl.leftTop, param)
}

/**左中--用户总览 */
export const countUserNum = (param: any = {}) => {
  return request.get(indexUrl.leftCenter, param)
}

/**左下--设备提醒 */
export const leftBottom = (param: any = {}) => {
  return request.get(indexUrl.leftBottom, param)
}

/**中上--地图 */
export const centerMap = (param: any = {}) => {
  return request.get(indexUrl.centerMap, param)
}

/**中下--安装计划 */
export const installationPlan = (param: any = {}) => {
  return request.get(indexUrl.centerBottom, param)
}

/**右上--报警次数 */
export const alarmNum = (param: any = {}) => {
  return request.get(indexUrl.rightTop, param)
}

/**右中--报警排名 */
export const ranking = (param: any = {}) => {
  return request.get(indexUrl.rightCenter, param)
}

/**右下--设备状态 */
export const rightBottom = (param: any = {}) => {
  return request.get(indexUrl.rightBottom, param)
}
export type Params = { [key: string]: string | number }

export const GETNOBASE = async (url: string, params?: Params): Promise<any> => {
  try {
    const data = await request.get(url, {
      params: params,
    })
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}
