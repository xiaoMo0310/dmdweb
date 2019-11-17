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

//添加权限
export function addPermission(param) {
  return request({
    url:'/admin/addPermission',
    method:'post',
    data: param
  })
}
//查询角色拥有的权限
// export function roleForPermission(param) {
//   return request({
//     url:'/admin/roleForPermission',
//     method:'get',
//     data: param
//   })
// }
//角色列表
export function roleList(param) {
  return request({
    url:'/admin/roleList',
    method:'post',
    data: param
  })
}
//添加权限和角色的对应关系
export function addPermissionForRole(param) {
  return request({
    url:'/admin/addPermissionForRole',
    method:'post',
    data: param
  })
}

//操作记录列表
export function getOperationLog(param) {
  return request({
    url:'/umsOperationLog/getOperationLog',
    method:'post',
    data: param
  })
}
