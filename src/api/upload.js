import request from '@/utils/request'
//文件上传
export function uploadFile(data, config) {
  return request({
    url:'/upload/file',
    method:'post',
    data: data,
    config: config
  })
}
//多文件上传
export function uploadFileAll(data, config) {
  return request({
    url:'/upload/file',
    method:'post',
    data: data,
    config: config
  })
}
