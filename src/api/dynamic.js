import request from '@/utils/request'
export function selectDynamicPage(params) {
  return request({
    url:'/dynamic/selectDynamicPage',
    method:'get',
    params:params
  })
}
export function updateDynamicDelflagById(data) {
  return request({
    url:'/dynamic/updateDynamicDelflagById',
    method:'post',
    data:data
  })
}
export function selectTopic(params) {
  return request({
    url:'/dynamic/selectTopic',
    method:'get',
    params:params
  })
}
export function queryDynamicById(id,userType,params) {
  return request({
    url:'/dynamic/selectDynamicById?id=' + id+"&userType="+userType,
    method:'get',
    params:params

  })
}
