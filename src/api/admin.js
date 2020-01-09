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
export function permissionAll(param,type) {
  return request({
    url:'/admin/allPermission?type='+type,
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
export function roleList(param,type) {
  return request({
    url:'/admin/roleList?type='+type,
    method:'post',
    data: param
  })
}

//添加权限和角色的对应关系
export function addPermissionForRole(param) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url:'/admin/addPermissionForRole',
    method:'post',
    data: param
  })
}
//是否禁用角色
export function isEnableRole(param) {
  return request({
    url:'/admin/isEnableRole',
    method:'post',
    data: param
  })
}
//添加角色
export function addRole(param) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url:'/admin/addRole',
    method:'post',
    data: param
  })
}
//删除角色
export function deleteRoles(param) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url:'/admin/deleteRoles',
    method:'post',
    data: param
  })
}
//修改角色
export function modifyRole(param) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url:'/admin/modifyRole',
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

//给用户分配角色
export function addRolesForAdmin(param) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url:'/admin/addRolesForAdmin',
    method:'post',
    data: param
  })
}
//删除用户信息
export function deleteUser(param) {
  console.log(param);
  console.log("===========kaikan");
  return request({
    url:'/admin/deleteUser',
    method:'post',
    data: param
  })
}
//更新用户信息
export function updateAdminInfo(param) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url:'/admin/updateAdminInfo',
    method:'post',
    data: param
  })
}
