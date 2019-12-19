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
export function integralRecordListCoach(params) {
  return request({
    url:'/integral/selectIntegralChangeByCoach',
    method:'get',
    params:params
  })
}

export function updateIntegrationCoach(id,data) {
  return request({
    url:'/integral/addIntegrationCoach?id='+id,
    method:'post',
    data:data
  })
}
export function updateIntegrationReduceCoach(id,data) {
  return request({
    url:'/integral/reduceIntegrationCoach?id='+id,
    method:'post',
    data:data
  })
}
