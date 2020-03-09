import request from '@/utils/request'
export function saveShopNotie(data) {
  return request({
    url:'/ums/shopNotice/save',
    method:'post',
    data:data
  })
}
export function fetchList(data) {
  return request({
    url:'/ums/shopNotice/list',
    method:'post',
    data:data
  })
}
export function deleteShopNotice(data) {
  return request({
    url:'/ums/shopNotice/delete',
    method:'post',
    data:data
  })
}
