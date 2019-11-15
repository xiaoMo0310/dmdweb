import request from '@/utils/request'
export function queryIntegralGiftsSpeById(id,params) {
  return request({
    url:'/integral/selectIntegralGiftsSpeById?id='+id,
    method:'get',
    params:params
  })
}
