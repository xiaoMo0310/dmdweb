import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/integralOrder/list',
    method:'get',
    params:params
  })
}

export function closeOrder(params) {
  return request({
    url:'/integralOrder/update/close',
    method:'post',
    params:params
  })
}

export function deleteOrder(params) {
  return request({
    url:'/integralOrder/delete',
    method:'post',
    params:params
  })
}

export function deliveryOrder(data) {
  return request({
    url:'/integralOrder/update/delivery',
    method:'post',
    data:data
  });
}

export function getOrderDetail(id) {
  return request({
    url:'/integralOrder/'+id,
    method:'get'
  });
}

export function updateReceiverInfo(data) {
  return request({
    url:'/integralOrder/update/receiverInfo',
    method:'post',
    data:data
  });
}

export function updateOrderNote(params) {
  return request({
    url:'/integralOrder/update/note',
    method:'post',
    params:params
  })
}
