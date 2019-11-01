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
