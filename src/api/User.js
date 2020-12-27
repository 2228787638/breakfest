import axios from '@/utils/axios'

export const wxlogin = (code) => axios('/users/login', {code: code}, 'get')
