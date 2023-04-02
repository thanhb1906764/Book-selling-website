<template >
    <div v-if="this.load">
    <div class="container border rounded ps-5">
        <div class="text-uppercase fw-semibold"> Chi tiểt đơn hàng</div>
        <div class="row">
            <div class="col">
                <div>Mã đơn hàng: {{ getIdOrder }}</div>
                <div>{{ this.orderDetail[0].orderStatus }}</div>

                <div>Ngày mua: {{ showDate(this.orderDetail[0].orderDate )}}</div>
                <div v-show="show">Ngày nhận: {{ showDate(this.orderDetail[0].reDate) }}</div>
                <div>Tổng tiền: {{ this.orderDetail[0].orderTotal }}</div>
            </div>
            <div class="col">
                <button type="button" class="btn btn-danger " @click="openDialog" :disabled="isDisable">Huỷ đơn
                    hàng</button>
            </div>
            <v-dialog v-model="dialog" persistent max-width="400">
                <v-card>
                    <v-card-title class="headline">Are you sure?</v-card-title>
                    <v-card-text>
                        This action cannot be undone.
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="green darken-1" text @click="dialog = false; cancelOrder()">Yes</v-btn>
                        <v-btn color="red darken-1" text @click="dialog = false">No</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
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
                    <td><img :src="getImageArray(items._idBook)" width="60" class="rounded" alt="..."></td>
                  
                    <td>{{ findBookNameById(items._idBook) }}</td>


                    <td>{{ items.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}</td>
                    <td>{{ items.quantity }}</td>
                    <td>{{ calc(items.price, items.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                    }}</td>

                </tr>

            </tbody>
        </v-table>
        <div class="d-flex justify-content-end">Thành tiền {{ this.orderDetail[0].totalProductMoney.toLocaleString('vi-VN',
            { style: 'currency', currency: 'VND' }) }}</div>
        <div class="d-flex justify-content-end">Phí vận chuyển {{ this.orderDetail[0].shipFee.toLocaleString('vi-VN',
            { style: 'currency', currency: 'VND' }) }}</div>
        <div class="d-flex justify-content-end">Chiết khấu</div>
        <div class="d-flex justify-content-end">Tổng số tiền {{ this.orderDetail[0].orderTotal.toLocaleString('vi-VN',
            { style: 'currency', currency: 'VND' }) }}</div>
    </div>
    </div>
</template>
<script>

import axios from 'axios'
import { useDataStore } from '@/stores/dataStores'
import ImagesService from '@/services/images.service'
import orderService from "../services/orders.service"
import BooksService from '@/services/books.service'

export default {
    data: () => {
        return {
            id: "",
            orderDetail: {},
            book: useDataStore().getBooks,
            isDisable: false,
            ImgaeArray: [],
            linkImage: "",
            show: true,
            dialog: false,
            orderList: null,
            load: false
        }
    },
    mounted() {
        this.loadOrderData()
    },
    methods: {
        openDialog() {
            this.dialog = true;
        },

        calc(price, quantity) {
            return price * quantity
        },
        showDate(data) {
            var date = new Date(data)
            var dateString = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' }).replace(/\//g, '-');
            var yearString = date.toLocaleDateString('en-GB', { year: 'numeric' });

            if (yearString == '1970')
                this.show = false
            return dateString
        },

        getImageArray(id) {

            this.ImgaeArray = useDataStore().getImages.filter(image => image._idBook === id);
            this.linkImage = this.ImgaeArray.filter(image => image._idBook === id)[0].linkImage;

            return this.linkImage

        },
        async loadOrderData() {
            console.log(useDataStore().getImages)
            // if(useDataStore().getImages=""){
            //     this.ImgaeArray = await ImagesService.getAll();
            //     useDataStore().setImages(this.ImgaeArray);
            //     console.log("ko co hinh")
            // }
            if(useDataStore().getOrderList=="")
            {
                this.orderList= await orderService.get(this.id);
                console.log(this.id)
                useDataStore().getAPIOrder(this.orderList);
                console.log("phai axios")
            }
            this.orderDetail= useDataStore().getOrderList
            console.log("get ok")
            this.load=true
            if (this.orderDetail[0].orderStatus !== "Chờ xác nhận")
            this.isDisable = true
            
        },
        findBookNameById(id) {

            this.book = useDataStore().getBooks
            //console.log(this.book)
            const foundBook = this.book.find(item => item._id === id);
            //  console.log(foundBook)
            if (foundBook) {
                return foundBook.bookName;
            }
            return "Book not found";
        },
        async cancelOrder() {
            await orderService.update(this.orderDetail[0]._id, { orderStatus: "Đã hủy" })

            for (let i = 0; i <= this.orderDetail[0].productList.length - 1; i++) {
                var quantity = this.orderDetail[0].productList[i].quantity //so luong cua 1 loai sach trong don hang
                var _idBook = this.orderDetail[0].productList[i]._idBook
                var bookStock = this.book.find(book => book._id == _idBook).bookStock //so luong kho cua sach theo id sach ben tren
                var undoStock = bookStock + quantity    // khoi phuc so luong 
                await BooksService.update(_idBook, { bookStock: undoStock })
                console.log(undoStock)

            }
            await this.$route.push({ name: "addressAcc" })
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
