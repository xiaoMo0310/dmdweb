import request from '@/utils/request'
export function findCourseProductList(data) {
  return request({
    url:'pms/courseProductList/find',
    method:'post',
    data:data
  })
}
export function findCourseProductById(data) {
  return request({
    url:'pms/courseProduct/find/' + data,
    method:'get',
  })
}
export function updateApprovalStatus(data) {
  return request({
    url:'pms/approvalStatus/update',
    method:'post',
    data: data
  })
}
