import request from '@/utils/request'
import da from "element-ui/src/locale/lang/da";
export function sendMessage(data, userType, param) {
  return request({
    url:'/ums/message/send/'+data + "/" + userType,
    method:'post',
    data: param
  })
}

export function sendAllMessage(userType, param) {
  return request({
    url:'/ums/message/sendAll/' + userType,
    method:'post',
    data: param
  })
}
export function batchSendMessage(params, userType, param2) {
  return request({
    url:'/ums/message/batchSend/' + userType,
    method:'post',
    params: params,
    data: param2
  })
}
export function fetchList(params) {
  return request({
    url:'/ums/message/list',
    method:'get',
    params:params
  })
}
export function updateStatus(id,params) {
  return request({
    url:'/home/advertise/update/status/'+id,
    method:'post',
    params:params
  })
}
export function deleteHomeAdvertise(data) {
  return request({
    url:'/home/advertise/delete',
    method:'post',
    data:data
  })
}
