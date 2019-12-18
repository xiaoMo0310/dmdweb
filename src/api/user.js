import request from '@/utils/request'
// //统计当日新注册用户
export function countDayRegisterUser() {
  return request({
    url:'/ums/registerUser/countDay',
    method:'get'
  })
}
//统计昨日访问的用户数量
export function countYesterdayVisitUser() {
  return request({
    url:'/ums/visitUser/countYesterday',
    method:'get'
  })
}
//统计总的注册人数
export function countTotalUser() {
  return request({
    url:'/ums/totalUser/count',
    method:'get'
  })
}
//统计留存率
export function countRetentionRate(day) {
  return request({
    url:'/ums/retentionRate/count/'+ day,
    method:'get',
  })
}
export function countThirtyRetentionRate(day) {
  return request({
    url:'/ums/retentionRate/countThirty/'+ day,
    method:'get',
  })
}
//查询用户列表信息
export function selectUserList(data) {
  return request({
    url:'/ums/userList/findPage',
    method:'post',
    data: data
  })
}
//冻结用户或者启动用户
export function freezeUser(param) {
  return request({
    url:'/ums/user/editStatus',
    method:'get',
    params: param
  })
}

//批量冻结用户或者启动用户
export function batchUpdateUserStatus(param) {
  return request({
    url:'/ums/status/batchUpdate',
    method:'post',
    params: param
  })
}

export function findUserMemberById(data) {
  return request({
    url:'/ums/user/findById/' + data,
    method:'get'
  })
}

export function findByInvitationCode(data, param) {
  return request({
    url:'/ums/user/findByInvitationCode',
    method:'post',
    data: data,
    params: param
  })
}

