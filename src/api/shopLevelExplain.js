import request from '@/utils/request'
export function udpateShopLevelExplain(data) {
  return request({
    url:'/ums/shop/levelExplain/saveOrUpdate',
    method:'post',
    data:data
  })
}
export function findShopLevelExplain() {
  return request({
    url:'/ums/shop/levelExplain/find',
    method:'post',
  })
}
export function findShopLevelExplainById(data) {
  return request({
    url:'/ums/shop/levelExplain/findById/' + data,
    method:'get',
  })
}
