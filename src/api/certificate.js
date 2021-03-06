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
export function findCertificateById(data) {
  return request({
    url:'/pms/certificate/findById/' + data,
    method:'get',
  })
}
export function deletePmsCertificate(data) {
  return request({
    url:'/pms/certificate/delete',
    method:'post',
    data: data
  })
}
export function findCertificateAndPageById(data, pageSize) {
  return request({
    url:'/pms/certificateAndPage/findById/' + data + "/" + pageSize,
    method:'get',
  })
}
