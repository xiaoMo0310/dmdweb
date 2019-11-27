import request from '@/utils/request'
export function queryOrderStatisticsPage(params) {
  return request({
    url:'/orderStatistics/selectOrderStatistics',
    method:'get',
    params:params
  })
}
export function exportOrderStatistics(params) {
  return request({
    url:'/orderStatistics/exportOrderStatistics',
    method:'post',
    params:params,
  })
}
export function uploadOrderStatistics(params) {
  return request({
    url:'/orderStatistics/exportOrderStatistics2',
    method:'get',
    params:params,
    header: {'Content-Type': 'application/json'},
    responseType: 'arraybuffer'
  })
}
