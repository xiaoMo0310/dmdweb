import request from '@/utils/request'
export function getFinanceSetting(id) {
  return request({
    url:'/omsFinanceSetting/'+id,
    method:'get',
  })
}

export function updateFinanceSetting(data) {
  return request({
    url:'/omsFinanceSetting/update',
    method:'post',
    data:data
  })
}
