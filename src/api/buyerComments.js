import request from '@/utils/request'
export function buyerComments(params) {
  return request({
    url:'/pmsComment/selectCommentAll',
    method:'get',
    params:params
  })
}
export function deleteBuyerComments(data) {
  return request({
    url:'/pmsComment/deleteComment',
    method:'post',
    data:data
  })
}

