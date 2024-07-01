import axios from './axios.js';

/** 左上--数据总览 */
export function leftTopData() {
  return axios.get('/dataScreen/leftTop');
}

/** 左中--AQI总览 */
export function leftCenterData() {
  return axios.get('/dataScreen/leftCenter');
}

/** 左下--公众监督信息 */
export function leftBottomData() {
  return axios.get('/dataScreen/leftBottom');
}

/** 中上--城市AQI详情 */
export function centerTopData(params) {
  return axios.get(`/dataScreen/centerMap`, { params });
}

/** 中下--覆盖率+指数超标率 */
export function centerBottomData() {
  return axios.get('/dataScreen/centerBottom');
}

/** 右上--污染超标 */
export function rightTopData() {
  return axios.get('/dataScreen/rightTop');
}

/** 右中--城市排名 */
export function rightCenterData() {
  return axios.get('/dataScreen/rightCenter');
}

/** 右下--网格监测信息 */
export function rightBottomData() {
  return axios.get('/dataScreen/rightBottom');
}

