<template>
  <div>
    <van-swipe-cell v-for="(value,index) in getOrdersComputed" :key="index" right-width="65">
      <van-card :num="value.amount">
        <view slot="title">
          {{value.orderNumber}}
        </view>
        <view slot="desc" style="font-size: 15px;">
          柜号： <van-tag type="warning" size="large">{{value.box.number}}</van-tag>
        </view>
        <view slot="price">
            <span style="font-size: 14px">
              柜子地址： {{value.box.address}}
            </span>
        </view>
        <view slot="thumb">
          <van-checkbox v-if = "batchEdit === true" :value="value.checked" @change="onChange(value)">
            <van-image width="50px" height="5rem" src="/static/images/chose_ico.png"/>
          </van-checkbox>
          <van-image v-else width="80px" height="5rem" src="/static/images/order_ico.png"/>
        </view>
      </van-card>
      <view slot="right" class="van-swipe-cell__right" @click="open(value.orderNumber)">开柜</view>
    </van-swipe-cell>
    <van-button @click="batchEditClick" class="batchOperationBtn" round color="linear-gradient(to right, #F781D8, #DF013A)">
      批
    </van-button>
  </div>
</template>

<script>
import {getOrdersByStatus, updateOrdersStatusToDelivered} from '@/api/Order'
export default {
  data () {
    return {
      activeTab: 0,
      orders: [],
      currentPage: 0,
      total: 0,
      batchEdit: false
    }
  },

  components: {
  },

  methods: {
    async getOrders (status) {
      let result = await getOrdersByStatus(status, this.currentPage, 10)
      this.orders = result.data.list
      this.total = result.data.total
    },
    batchEditClick () {
      this.batchEdit = this.batchEdit === false
    },
    onChange (order) {
      order.checked = order.checked === false
    },
    async open (orderNumber) {
      let result = await updateOrdersStatusToDelivered(orderNumber)
      console.log(result)
    }
  },
  async onPullDownRefresh () {
    this.currentPage = 0
    await this.getOrders('3')
    mpvue.stopPullDownRefresh()
  },
  async onReachBottom () {
    if ((this.currentPage + 1) * 10 > this.total) {
      mpvue.showToast({ icon: 'none', title: '到底啦！' })
    } else {
      this.currentPage = this.currentPage + 1
      let result = await getOrdersByStatus('3', this.currentPage, 10)
      this.orders = this.orders.concat(result.data.list)
    }
  },
  mounted () {
    this.getOrders('3')
  },
  computed: {
    getOrdersComputed () {
      return this.orders
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
