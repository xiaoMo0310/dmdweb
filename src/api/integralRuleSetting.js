import request from '@/utils/request'
export function getIntegralRuleSetting(id) {
  return request({
    url:'/integrationRuleSetting/'+id,
    method:'get',
  })
}

export function updateIntegralRuleSetting(data) {
  return request({
    url:'/integrationRuleSetting/update',
    method:'post',
    data:data
  })
}
