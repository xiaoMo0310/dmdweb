import request from '@/utils/request'
export function integrationRule(params) {
  return request({
    url:'/integral/selectIntegralRule',
    method:'get',
    params:params
  })
}
export function findIntegralInfoById(id) {
  return request({
    url:'/integral/findIntegralInfoById/?id='+id,
    method:'get',
  })
}
export function updateIntegralList(id,data) {
  return request({
    url:'/integral/updateIntegralRule/?id='+id,
    method:'post',
    data:data
  })
}
