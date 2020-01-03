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
export function findProductAndPageNumById(data) {
  return request({
    url:'pms/productAndPageNum/find',
    method:'post',
    data: data
  })
}
export function updateApprovalStatus(data) {
  return request({
    url:'pms/approvalStatus/update',
    method:'post',
    data: data
  })
}

export function queryAudited(data) {
  return request({
    url:'/pms/queryAudited',
    method:'get',
    data:data
  })
}

export function queryAuditPass(data) {
  return request({
    url:'/pms/queryAuditPass',
    method:'get',
    data:data
  })
}

export function queryAuditFailed(data) {
  return request({
    url:'/pms/queryAuditFailed',
    method:'get',
    data:data
  })
}

export function queryAllMerchandise(data) {
  return request({
    url:'/pms/queryAllMerchandise',
    method:'get',
    data:data
  })
}
