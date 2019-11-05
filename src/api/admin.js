import request from '@/utils/request'
//查询全部管理员
export function adminList(param) {
  return request({
    url:'/admin/list',
    method:'get',
    params: param
  })
}
//添加管理员
export function addAdmin(param) {
  return request({
    url:'/admin/register',
    method:'post',
    data: param
  })
}


//权限列表
export function permissionAll(param) {
  return request({
    url:'/admin/allPermission',
    method:'post',
    data: param
  })
}
//禁用权限
export function isForbiddenPermission(param) {
  return request({
    url:'/admin/isForbiddenPermission',
    method:'post',
    data: param
  })
}

