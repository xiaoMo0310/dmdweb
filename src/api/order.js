import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/order/list',
    method:'get',
    params:params
  })
}

export function closeOrder(params) {
  return request({
    url:'/order/update/close',
    method:'post',
    params:params
  })
}

export function deleteOrder(params) {
  return request({
    url:'/order/delete',
    method:'post',
    params:params
  })
}

export function deliveryOrder(data) {
  return request({
    url:'/order/update/delivery',
    method:'post',
    data:data
  });
}

export function getOrderDetail(id) {
  return request({
    url:'/order/'+id,
    method:'get'
  });
}

export function updateReceiverInfo(data) {
  return request({
    url:'/order/update/receiverInfo',
    method:'post',
    data:data
  });
}

export function updateMoneyInfo(data) {
  return request({
    url:'/order/update/moneyInfo',
    method:'post',
    data:data
  });
}

export function updateOrderNote(params) {
  return request({
    url:'/order/update/note',
    method:'post',
    params:params
  })
}

export function queryOrderNumtoDay(data) {
  return request({
    url:'/order/queryOrderNumtoDay',
    method:'get',
    data:data
  })
}
export function queryOrderMoneyToDay(data) {
  return request({
    url:'/order/queryOrderMoneyToDay',
    method:'get',
    data:data
  })
}

export function queryOrderMoneyToYesterday(data) {
  return request({
    url:'/order/queryOrderMoneyToYesterday',
    method:'get',
    data:data
  })
}

export function queryOrderMoneyToSeven(data) {
  return request({
    url:'/order/queryOrderMoneyToSeven',
    method:'get',
    data:data
  })
}

export function querySubstitutePayment(data) {
  return request({
    url:'/order/querySubstitutePayment',
    method:'get',
    data:data
  })
}
export function queryCompleted(data) {
  return request({
    url:'/order/queryCompleted',
    method:'get',
    data:data
  })
}

export function queryReceiptConfirmed(data) {
  return request({
    url:'/order/queryReceiptConfirmed',
    method:'get',
    data:data
  })
}

export function queryShipped(data) {
  return request({
    url:'/order/queryShipped',
    method:'get',
    data:data
  })
}

export function queryAfterSale(data) {
  return request({
    url:'/order/queryAfterSale',
    method:'get',
    data:data
  })
}

export function queryConfirmReceipt(data) {
  return request({
    url:'/order/queryConfirmReceipt',
    method:'get',
    data:data
  })
}
