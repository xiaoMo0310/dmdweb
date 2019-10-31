import request from '@/utils/request'
export function queryDiveLogAirbottleByDiveLogId(id,params) {
  return request({
    url:'/diveLog/selectDiveLogAirbottleByDiveLogId?id='+id,
    method:'get',
    params:params
  })
}
