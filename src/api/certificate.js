import request from '@/utils/request'
export function saveOrUpdate(data) {
  return request({
    url:'/pms/certificate/saveOrUpdate',
    method:'post',
    data:data
  })
}
export function fetchList(data) {
  return request({
    url:'/pms/certificateList/findByPage',
    method:'post',
    data:data
  })
}
