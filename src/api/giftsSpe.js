import request from '@/utils/request'
export function queryIntegralGiftsSpeById(id,params) {
  return request({
    url:'/integral/selectIntegralGiftsSpeById?id='+id,
    method:'get',
    params:params
  })
}
export function addGiftsSpe(giftId,data) {
  return request({
    url:'/integral/addGiftsSpe?giftId='+giftId,
    method:'post',
    data:data
  })
}
export function updateIntegralGiftsSpe(id,data) {
  return request({
    url:'/integral/updateIntegralGiftsSpe/?id='+id,
    method:'post',
    data:data
  })
}
export function findIntegralGiftsSpeInfoById(id) {
  return request({
    url:'/integral/findIntegralGiftsSpeInfoById/?id='+id,
    method:'get',
  })
}
export function deleteIntegralGiftsSpeById(data) {
  return request({
    url:'/integral/deleteIntegralGiftsSpeById',
    method:'post',
    data:data
  })
}
