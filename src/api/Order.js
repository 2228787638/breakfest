import axios from '@/utils/axios'

export const getOrdersByStatus = (status, page, size) => axios('/orders/status', {status: status, page: page, pageSize: size}, 'get')
export const updateOrdersStatusToDelivered = (orderIds) => axios('/orders/status/delivered', {orderIds: orderIds}, 'put')
