<template>
  <div>
    <van-tabs :active="activeTab" bind:change="onChange">
      <van-tab title="开柜">
        <van-swipe-cell v-for="(value,index) in order" :key="index" right-width="65">
          <van-card>
            <view slot="title">
              订单号
            </view>
            <view slot="desc" style="font-size: 15px;">
              订单详情
            </view>
            <view slot="price">
                <span style="font-size: 14px">
                  订单金额: ￥25.00
                </span>
            </view>
            <view slot="thumb">
              <van-checkbox v-if = "batchEdit === true" :value="value.checked" @change="onChange(value)">
                <van-image width="50px" height="5rem" src="/static/images/chose_ico.png"/>
              </van-checkbox>
              <van-image v-else width="80px" height="5rem" src="/static/images/order_ico.png"/>
            </view>
          </van-card>
          <view slot="right" class="van-swipe-cell__right">开柜</view>
        </van-swipe-cell>
      </van-tab>
      <van-tab title="入柜">
        <van-swipe-cell v-for="(value,index) in order" :key="index" right-width="65">
          <van-card>
            <view slot="title">
              订单号
            </view>
            <view slot="desc" style="font-size: 15px;">
              订单详情
            </view>
            <view slot="price">
                <span style="font-size: 14px">
                  订单金额: ￥25.00
                </span>
            </view>
            <view slot="thumb">
              <van-checkbox v-if = "batchEdit === true" :value="value.checked" @change="onChange(value)">
                <van-image width="50px" height="5rem" src="/static/images/chose_ico.png"/>
              </van-checkbox>
              <van-image v-else width="80px" height="5rem" src="/static/images/order_ico.png"/>
            </view>
          </van-card>
          <view slot="right" class="van-swipe-cell__right">入柜</view>
        </van-swipe-cell>
      </van-tab>
    </van-tabs>
    <van-button @click="batchEditClick" class="batchOperationBtn" round color="linear-gradient(to right, #F781D8, #DF013A)">
      批
    </van-button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      activeTab: 0,
      order: [
        {
          num: 55647321,
          checked: false
        },
        {
          num: 55647321,
          checked: false
        }
      ],
      batchEdit: false
    }
  },

  components: {
  },

  methods: {
    batchEditClick () {
      this.batchEdit = this.batchEdit === false
    },
    onChange (order) {
      order.checked = order.checked === false
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
  .van-swipe-cell__left {
    display: inline-block;
    width: 65px;
    height: 100%;
    font-size: 15px;
    line-height: 44px;
    color: #fff;
    text-align: center;
    background-color: rgb(254, 61, 61);
  }
  .van-swipe-cell__right {
    display: inline-block;
    width: 65px;
    height: 100%;
    font-size: 15px;
    line-height: 44px;
    color: #fff;
    text-align: center;
    background-color: #00a900;
  }
  .batchOperationBtn {
    font-size: 30px;
    position:fixed;
    display:flex;
    justify-content: center;
    bottom:20px;
    z-index: 99;
    right:20px;
  }
</style>
