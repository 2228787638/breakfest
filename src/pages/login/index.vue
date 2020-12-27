<template>
  <div class="container">
    <div style="width: 98%; height: 100%; margin: 0 auto; text-align: center; position: relative; top: 130px;">
      <van-image round src="../../../static/images/service.png" width="5rem" height="5rem"/>
      <view class="me-container">
        申请
      </view>
      <view class="me-container" style="margin-top: 2px;">
        获取你的微信昵称和头像:
      </view>
      <view style="margin-top: 10px;">
        <van-button plain open-type="getUserInfo" @getuserinfo="login" round size="large" type="primary">
          同意授权
        </van-button>
      </view>
    </div>
  </div>
</template>

<script>
  import {wxlogin} from '@/api/User'
  export default {
    components: {},

    data () {
    },
    methods: {
      async login () {
        let me = this
        let obj = wx.getStorageSync('USER_INFO')
        if (obj) {
          wx.switchTab({url: this.path})
        } else {
          wx.login({
            async success (res) {
              if (res.code) {
                me.code = res.code
                wx.setStorageSync('code', res.code)
                let result = await wxlogin(res.code)
                if (result.data.retCode === 200) {
                  wx.setStorageSync('token', result.data.data)
                }
              }
            }
          })
        }
      }
    },
    created () {
    },
    mounted () {
      this.login()
    }
  }
</script>

<style>
  .me-container {
    display:flex;
    justify-content: center;
  }
</style>
