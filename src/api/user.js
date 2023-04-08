import request from '@/utils/request'

const api = "http://localhost:2221/assets"

export function login(data) {
  return request({
    url: `${api}/user/login`,
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

// 登录
// export function login(data) {
//   return request({
//     url: `${api}/user/Login`,
//     method: 'post',
//     data
//   })
// }

// 注册
export function register(data) {
  return request({
    url: `${api}/user/register`,
    method: 'post',
    data
  })
}
