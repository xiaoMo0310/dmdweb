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
export function queryDynamicById(forDynamicId,commentId,userType,params) {
  return request({
    url:'/comment/selectDynamicById?forDynamicId=' + forDynamicId+"&commentId="+commentId+"&userType="+userType,
    method:'get',
    params:params

  })
}
export function dynamicCommentsByComment(data,forDynamicId) {
  return request({
    url:'/comment/selectDynamicByIdComment?forDynamicId='+forDynamicId,
    method:'post',
    data:data
  })
}
