import request from '@/utils/request'
export function queryProblemFeedback(params) {
  return request({
    url:'/feedback/selectProblemFeedback',
    method:'get',
    params:params
  })
}
export function saveOrUpdate(params) {
  return request({
    url:'/feedback/saveOrUpdateStatus',
    method:'post',
    params:params
  })
}
export function updateStatus(id,data) {
  return request({
    url:'/feedback/updateStatus?id='+id,
    method:'post',
    data:data
  })
}
export function addFeedback(data) {
  return request({
    url:'/feedback/addFeedback',
    method:'post',
    data:data
  })
}
export function queryUserFeedback(params) {
  return request({
    url:'/feedback/selectUserFeedback',
    method:'get',
    params:params
  })
}
export function queryProblemFeedbackByName(params) {
  return request({
    url:'/feedback/queryProblemFeedbackByName',
    method:'get',
    params:params
  })
}
export function deletequeryUserFeedback(data) {
  return request({
    url:'/feedback/deleteUserFeedback',
    method:'post',
    data:data
  })
}
