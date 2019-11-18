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
