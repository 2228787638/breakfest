import axios from 'axios'
/**
 * axios配置
 */
// axios请求拦截器
axios.defaults.baseURL = 'http://106.53.102.70:9000'
axios.interceptors.request.use(config => {
  mpvue.showLoading({title: '加载中...'})
  return config
}, error => {
  mpvue.showToast({ icon: 'none', title: '网络繁忙,请稍后重试' })
  console.log(error, 'error')
  return Promise.reject(error)
})

axios.interceptors.response.use(data => {
  mpvue.hideLoading()
  if (data.data.retCode === 501) {
    mpvue.navigateTo({url: '/pages/login/main'})
  } else {
    return data
  }
}, error => {
  mpvue.showToast({ icon: 'none', title: '网络繁忙,请稍后重试' })
  console.log(error, 'error2')
  return Promise.reject(error)
})

axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    mpvue.request({
      url: config.url,
      data: config.params,
      method: config.method,
      header: {
        'token': wx.getStorageSync('token'),
        'Content-Type': 'application/json; charset=UTF-8'
      },
      success: (res) => {
        return resolve(res)
      },
      fail: (res) => {
        return reject(res)
      }
    })
  })
}

/**
 * url:请求地址
 * params:请求参数
 * mthods:请求方法
 * */

export default (url, params, method) => {
  const response = axios(axios.defaults.baseURL + url, { params, method })
  return response
}
