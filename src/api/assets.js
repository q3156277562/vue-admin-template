import request from '@/utils/request'
const api = "http://localhost:2221/assets"

// 资产入库
export function assetsAdd(data) {
    return request({
        url: `${api}/assets/add`,
        method: 'post',
        data
    })
}

// 资产列表
export function list() {
    return request({
        url: `${api}/assets/list`,
        method: 'post',
    })
}
// 资产报废
export function scrapped(data) {
    return request({
        url: `${api}/assets/scrapped`,
        method: 'post',
        data
    })
}
// 资产修改
export function update(data) {
    return request({
        url: `${api}/assets/update`,
        method: 'post',
        data
    })
}
// 资产详情
export function findOne(data) {
    return request({
        url: `${api}/assets/findOne`,
        method: 'post',
        data
    })
}
