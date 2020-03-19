import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'/pms/tagList/findByPage',
    method:'post',
    data:data
  })
}
export function saveOrUpdateTag(data) {
  return request({
    url:'/pms/tag/saveOrUpdate',
    method:'post',
    data:data
  })
}
export function updateShowStatus(data) {
  return request({
    url:'/pms/tag/showStatus/update',
    method:'post',
    data:data
  })
}

export function deleteTag(data) {
  return request({
    url:'/pms/tag/delete',
    method:'post',
    data: data
  })
}

export function getTagById(id) {
  return request({
    url:'/pms/tag/findById/'+id,
    method:'get',
  })
}
