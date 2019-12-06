import request from '@/utils/request'
export function querySalesStatistics(params) {
  return request({
    url:'/sales/selectSalesStatistics',
    method:'get',
    params:params
  })
}
export function exportOrderStatistics(params) {
  return request({
    url:'/sales/exportOrderStatistics',
    method:'post',
    params:params,
  })
}
