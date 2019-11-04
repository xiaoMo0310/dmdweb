import request from '@/utils/request'
export function selectDiveCertificate(params) {
  return request({
    url: '/diveCertificate/selectDiveCertificate',
    method: 'get',
    params: params
  })
}
export function updateDiveCertificateStatusPass(data) {
  return request({
    url:'/diveCertificate/updateDiveCertificateStatusPass',
    method:'post',
    data:data
  })
}
export function updateDiveCertificateStatusNoPass(data) {
  return request({
    url:'/diveCertificate/updateDiveCertificateStatusNoPass',
    method:'post',
    data:data
  })
}
