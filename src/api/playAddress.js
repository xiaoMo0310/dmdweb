import request from '@/utils/request'
export function saveOrUpdate(data) {
  return request({
    url:'/pms/playAddress/saveOrUpdate',
    method:'post',
    data:data
  })
}
export function fetchList(data) {
  return request({
    url:'/pms/playAddress/findByPage',
    method:'post',
    data:data
  })
}

export function findPlayAddressByPage(data) {
  return request({
    url:'/pms/playAddress/findByPage',
    method:'post',
    data:data
  })
}

export function updateIsDefaultById(data) {
  return request({
    url:'/pms/isDefault/update/' + data,
    method:'get'
  })
}
export function findPlayAddressById(data) {
  return request({
    url:'/pms/playAddress/findById/' + data,
    method:'get',
  })
}
export function deletePlayAddress(data) {
  return request({
    url:'/pms/playAddress/delete',
    method:'post',
    data: data
  })
}
