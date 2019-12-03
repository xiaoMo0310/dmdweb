import request from '@/utils/request'
export function queryAnalysisReport(params) {
  return request({
    url:'/analysis/selectAnalysisReport',
    method:'get',
    params:params
  })
}
export function exportOrderStatistics(params) {
  return request({
    url:'/analysis/exportOrderStatistics',
    method:'post',
    params:params,
  })
}
