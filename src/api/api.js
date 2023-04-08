import request from '@/utils/request'
const api = "http://localhost:2221/assets"

// 图片上传 
export function assetsAdd(file) {
    return request({
        url: `${api}/file/upload`,
        method: 'post',
        file
    })
}