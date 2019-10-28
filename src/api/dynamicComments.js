import request from '@/utils/request'
export function dynamicComments(params) {
  return request({
    url:'/comment/selectCommentAll',
    method:'get',
    params:params
  })
}
export function deleteDynamicComments(data) {
  return request({
    url:'/comment/updateCommentDelflag',
    method:'post',
    data:data
  })
}
