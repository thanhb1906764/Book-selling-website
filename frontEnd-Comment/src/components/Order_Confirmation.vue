<template>
    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
        <h6>Số lượng đơn hàng chờ xác nhận: {{ orderList.length }}</h6>
        <div class="border" style="margin: 20px auto; width: 80%;" v-for="item in orderList" :key="item._id">
            <div style="padding: 20px;">
                <div class="row">
                    <div class="col">
                        <p>Mã đơn hàng: {{ item._id }}</p>
                        <p>Ngày đặt hàng: {{ formatDate(item.orderDate, 0) }}</p>
                        <p style="display: flex;">Hình thức thanh toán:
                        <p style="color: green;"> {{ item.payment }}</p>
                        </p>
                        <p style="display: flex;">Trạng thái đơn hàng:
                        <p style="color: blue;"> {{ item.orderStatus }}</p>
                        </p>
                    </div>
                    <div class="col">
                        <p>Tên người nhận hàng: {{ item.userName }}</p>
                        <p>Số điện thoại: {{ item.phone }}</p>
                        <p>Địa chỉ nhận hàng: {{ item.reAddress }}</p>
                    </div>
                </div>
                <h5>Thông tin đặt hàng</h5>
                <v-table fixed-header height="300px">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá bán (&#8363;)</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(index, i) in item.productList" :key="index._idBook">
                            <th>{{ i + 1 }}</th>
                            <th>{{ getName(index._idBook) }}</th>
                            <th>{{ index.quantity }}</th>
                            <th>{{ index.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}</th>
                            <th></th>
                        </tr>
                        <tr>
                            <th colspan="4">Tổng tiền hàng</th>
                            <th>{{ item.totalProductMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}
                            </th>
                        </tr>
                        <tr>
                            <th colspan="4">Phí vận chuyển</th>
                            <th>{{ item.shipFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}</th>
                        </tr>
                        <tr>
                            <th colspan="4">Tổng thanh toán</th>
                            <th>{{ item.orderTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}</th>
                        </tr>
                    </tbody>
                </v-table>
                <div style="text-align: center;">
                    <button class="btn btn-primary" style="margin-right: 20px;" @click="confirmation(item)">Xác
                        nhận</button>
                    <button class="btn btn-danger" @click="cancel(item)">Hủy</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { format } from 'date-fns';
import { toast } from 'vue3-toastify';
import { useDataStore } from '../stores/dataStores';
import OrdersService from '../services/orders.service';
export default {
    data() {
        return {
            orderList: useDataStore().getOrderList.filter(order => order.orderStatus === 'Chờ xác nhận'),
        }
    },
    methods: {
        orderNumber() {
            this.$emit('info', this.orderList.length)
            console.log(this.orderList.length)

        },
        getName(id) {
            var book = useDataStore().getBooks.filter(book => book._id === id)
            book = book[0]
            return book.bookName
        },
        async confirmation(order) {
            try {
                var kq = await OrdersService.update(order._id, { orderStatus: 'Lấy hàng' })
                if (kq) {
                    toast.success(order._id + " đã xác nhận!", {
                        transition: toast.TRANSITIONS.SLIDE,
                    });
                    var data = await OrdersService.getAll()
                    useDataStore().updateOrders(data)
                    this.orderList = useDataStore().getOrderList.filter(order => order.orderStatus === 'Chờ xác nhận')
                }
            }
            catch (err) {
                console.log(err)
            }
        },
        async cancel(order) {
            try {
                if (confirm('Bạn muốn hủy đơn hàng ' + order._id)) {
                    var kq = await OrdersService.update(order._id, { orderStatus: 'Đã hủy' })
                    if (kq) {
                        toast.success(order._id + " đã hủy!", {
                            transition: toast.TRANSITIONS.SLIDE,
                        });
                        var data = await OrdersService.getAll()
                        useDataStore().updateOrders(data)
                        this.orderList = useDataStore().getOrderList.filter(order => order.orderStatus === 'Chờ xác nhận')
                    }
                }
            }
            catch (err) {
                console.log(err)
            }
        },
        formatDate(time, flag) {
            if (flag === 0) {
                return format(new Date(time), 'yyyy-MM-dd HH:mm')
            }
            return format(new Date(time), 'yyyy-MM-dd')
        }
    },
    computed: {

    },
    mounted() {
        this.orderNumber()
        console.log(this.orderList)
    }
}
</script>