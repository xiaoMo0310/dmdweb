import request from '@/utils/request'
export function integralRecordList(params) {
  return request({
    url:'/integral/selectIntegralChange',
    method:'get',
    params:params
  })
}
export function updateIntegration(id,data) {
  return request({
    url:'/integral/addIntegration?id='+id,
    method:'post',
    data:data
  })
}
export function updateIntegrationReduce(id,data) {
  return request({
    url:'/integral/reduceIntegration?id='+id,
    method:'post',
    data:data
  })
}
