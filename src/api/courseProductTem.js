import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/pms/courseProduct/templateList',
    method:'post',
    data:params
  })
}
export function deleteProductTem(data) {
  return request({
    url:'/pms/courseProduct/template/delete',
    method:'post',
    data:data
  })
}

export function createOrUpdateProductTem(data) {
  return request({
    url:'/pms/courseProduct/template/createOrUpdate',
    method:'post',
    data:data
  })
}

export function getProductTemplateById(id) {
  return request({
    url:'/pms/courseProduct/template/findById/'+id,
    method:'get',
  })
}

export function updateShowStatus(data) {
  return request({
    url:'/pms/template/showStatus/update/showStatus',
    method:'post',
    data:data
  })
}

