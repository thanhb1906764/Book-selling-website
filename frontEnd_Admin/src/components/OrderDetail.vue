<template>
    <div class="container border rounded ps-5">
        <div class="text-uppercase fw-semibold"> Chi tiểt đơn hàng</div>
        <div class="row">
            <div class="col">
                <div>Mã đơn hàng: {{ getIdOrder }}</div>
                <div>{{ this.orderDetail[0].orderStatus }}</div>

                <div>Ngày mua: {{ this.orderDetail[0].orderDate }}</div>
                <div>Ngày nhận: {{ this.orderDetail[0].reDate }}</div>
                <div>Tổng tiền: {{ this.orderDetail[0].orderTotal }}</div>
            </div>
            <div class="col">
                <button type="button" class="btn btn-danger " @click="getBookName" :disabled="isDisable">Huỷ đơn
                    hàng</button>
            </div>
        </div>

    </div>

    <div class="container border rounded ps-5">
        <div class="row">
            <div class="col-sm">Thông tin người nhận
                <div>{{ this.orderDetail[0].userName }}</div>
                <div>{{ this.orderDetail[0].phone }}</div>
                <div>{{ this.orderDetail[0].reAddress }}</div>

            </div>
            <div class="col-sm">Phương thúc thanh toán
                <div>{{ this.orderDetail[0].payment }}</div>
            </div>
        </div>
    </div>
    <div class="container border rounded ps-5">
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">
                        Hình ảnh
                    </th>
                    <th class="text-left">
                        Tên sản phẩm
                    </th>
                    <th class="text-left">
                        Giá bán
                    </th>
                    <th class="text-left">
                        Só lượng
                    </th>
                    <th class="text-left">
                        Thành tiền
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="items in this.orderDetail[0].productList">
                    <td>asdasd</td>
                    <!-- <td v-if="this.book.length > 0">{{findBookNameById(items._id)}}</td>
                    <td v-else>Loading...</td> -->
                    <td>{{ findBookNameById(items._idBook) }}</td>


                    <td>{{ items.price }}</td>
                    <td>{{ items.quantity }}</td>
                    <td>{{ calc(items.price, items.quantity) }}</td>

                </tr>

            </tbody>
        </v-table>
        <div class="d-flex justify-content-end">Thành tiền {{ this.orderDetail[0].totalProductMoney }}</div>
        <div class="d-flex justify-content-end">Phí vận chuyển {{ this.orderDetail[0].shipFee }}</div>
        <div class="d-flex justify-content-end">Chiết khấu</div>
        <div class="d-flex justify-content-end">Tổng số tiền {{ this.orderDetail[0].orderTotal }}</div>
    </div>
</template>
<script>

import axios from 'axios'
import { useDataStore } from '@/stores/dataStores'
export default {
    data: () => {
        return {
            id: "",
            orderDetail: null,
            book: useDataStore().getBooks,
            isDisable: false
        }
    },
    mounted() {

        if (this.orderDetail[0].orderStatus === "Chờ xác nhận" || this.orderDetail[0].status === 'Lấy hàng')
            this.isDisable = true
    },
    methods: {
        calc(price, quantity) {
            return price * quantity
        },
        findBookNameById(id) {

            this.book = useDataStore().getBooks
            // console.log(this.book)
            const foundBook = this.book.find(item => item._id === id);
            //  console.log(foundBook)
            if (foundBook) {
                return foundBook.bookName;
            }
            return "Book not found";
        }
    },

    computed: {
        getIdOrder() {
            this.id = this.$route.params.id
            this.orderDetail = useDataStore().getOrderList.filter(items => items._id == this.id)

            return this.id
        }
    }
}
</script>