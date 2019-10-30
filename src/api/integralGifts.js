import request from '@/utils/request'
export function queryIntegralGifts(params) {
  return request({
    url:'/integral/selectIntegralGifts',
    method:'get',
    params:params
  })
}
export function deleteIntegralGiftsById(data) {
  return request({
    url:'/integral/deleteIntegralGiftsById',
    method:'post',
    data:data
  })
}
export function updateIntegralGifts(id,data) {
  return request({
    url:'/integral/updateIntegralGifts/?id='+id,
    method:'post',
    data:data
  })
}
export function findIntegralGiftsInfoById(id) {
  return request({
    url:'/integral/findIntegralGiftsInfoById/?id='+id,
    method:'get',
  })
}
export function addIntegralGifts(data) {
  return request({
    url:'/integral/addIntegralGifts',
    method:'post',
    data:data
  })
}
