import request from '@/utils/request'

//统计当日新注册用户
export function countDayRegisterCoach() {
  return request({
    url:'/ums/registerCoach/countDay',
    method:'get'
  })
}
//统计昨日访问的用户数量
export function countYesterdayVisitCoach() {
  return request({
    url:'/ums/visitCoach/countYesterday',
    method:'get'
  })
}
//统计总的注册人数
export function countTotalCoach() {
  return request({
    url:'/ums/totalCoach/count',
    method:'get'
  })
}
//统计留存率
export function countCoachRetentionRate(day) {
  return request({
    url:'/ums/coach/retentionRate/count/'+ day,
    method:'get',
  })
}
export function countCoachThirtyRetentionRate(day) {
  return request({
    url:'/ums/coach/retentionRate/countThirty/'+ day,
    method:'get',
  })
}

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
