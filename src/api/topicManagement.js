import request from '@/utils/request'
export function topicList(params) {
  return request({
    url:'/topic/selectTopicPage',
    method:'get',
    params:params
  })
}
export function deleteTopicList(data) {
  return request({
    url:'/topic/deleteTopicById',
    method:'post',
    data:data
  })
}
export function updateTopicList(id,data) {
  return request({
    url:'/topic/addOrUpdateTopic/?id='+id,
    method:'post',
    data:data
  })
}
export function getTopicById(id) {
  return request({
    url:'/topic/findTopicInfoById/?id='+id,
    method:'get',
  })
}
export function addTopicList(data) {
  return request({
    url:'/topic/addTopic',
    method:'post',
    data:data
  })
}
