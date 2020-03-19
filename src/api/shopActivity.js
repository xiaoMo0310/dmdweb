import request from '@/utils/request'
export function createOrUpdateShopActivity(data) {
  return request({
    url:'/sms/activity/createOrUpdate',
    method:'post',
    data:data
  })
}
export function findShopActivityById(data) {
  return request({
    url:'/sms/activity/findById/' + data,
    method:'get',
  })
}
export function fetchList(data) {
  return request({
    url:'/sms/activity/findByPage',
    method:'post',
    data:data
  })
}

export function deleteShopActivity(data) {
  return request({
    url:'/sms/activity/delete',
    method:'post',
    data:data
  })
}

export function updateShowStatus(data) {
  return request({
    url:'/sms/activity/update/showStatus',
    method:'post',
    data:data
  })
}

