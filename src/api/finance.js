import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url:'/oms/incomeAndExpenditureDetails/find',
    method:'post',
    data:data
  })
}
export function findFashionableList(data) {
  return request({
    url:'/oms/fashionableList/find',
    method:'post',
    data:data
  })
}

export function udpateFashionableStatus(data) {
  return request({
    url:'/oms/fashionableStatus/update/' + data,
    method:'post'
  })
}

