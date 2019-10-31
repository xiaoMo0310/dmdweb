import request from '@/utils/request'
export function selectDiveLogAll(params) {
  return request({
    url:'/diveLog/selectDiveLogAll',
    method:'get',
    params:params
  })
}
export function updateCommentDelflag(data) {
  return request({
    url:'/diveLog/updateCommentDelflag',
    method:'post',
    data:data
  })
}
