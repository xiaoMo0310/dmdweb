import request from '@/utils/request'

//查询用户列表信息
export function selectUserList(data) {
  return request({
    url:'/ums/coachList/findPage',
    method:'post',
    data: data
  })
}
//冻结用户或者启动用户
export function freezeUser(param) {
  return request({
    url:'/ums/coach/editStatus',
    method:'get',
    params: param
  })
}

//批量冻结用户或者启动用户
export function batchUpdateUserStatus(param) {
  return request({
    url:'/ums/coach/status/batchUpdate',
    method:'post',
    params: param
  })
}

export function findCoachById(data) {
  return request({
    url:'/ums/coach/findById/' + data,
    method:'get'
  })
}

export function findByStatus(data) {
  return request({
    url:'/ums/coach/findByStatus',
    method:'post',
    data: data
  })
}
export function updateCoachMessageById(data) {
  return request({
    url:'/ums/coach/updateById',
    method:'post',
    data: data
  })
}
