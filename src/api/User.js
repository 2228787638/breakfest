import axios from '@/utils/axios'

export const wxlogin = (code) => axios('/wxlogin', {code: code, num: 1}, 'get')
export const uploadWXUserInfo = (data) => axios('/users/uploadWXUserInfo', data, 'post')
export const getCurrentUser = () => axios('/getCurrentUser', null, 'get')
export const getAllUsersCount = () => axios('/users/getAllUsersCount', null, 'get')
