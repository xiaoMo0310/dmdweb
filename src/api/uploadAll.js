import request from '@/utils/request'
//多张件上传
export function uploadFileAll(data) {
  return request({
    url:'/uploadFile/saveFile',
    method:'post',
    data: data,
  })
}
