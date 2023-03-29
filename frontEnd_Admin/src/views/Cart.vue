<template>
    <table class="table table-hover container">
        <thead class="user-select-none">
            <tr class="align-middle">
                <th class="fs-2 fw-bold text-danger text-center" colspan="6">Giỏ hàng</th>
            </tr>
            <tr>
                <th style="width: 50%;" colspan="2" scope="col">Sản phẩm</th>
                <th class="text-center" style="width: 15%;" scope="col">Đơn giá</th>
                <th class="text-center" style="width: 15%;" scope="col">Số lượng</th>
                <th class="text-center" style="width: 15%;" scope="col">Tổng</th>
                <th class="text-center" style="width: 5%;" scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in BookInCart" :key="item._id">
                <CardOfCart :Book="item" />
            </tr>

            <!-- Thanh toán  -->
            <tr class="fs-6 fw-bold text-danger">
                <td colspan="3"></td>
                <td class="align-middle text-center">Tính tạm</td>
                <td class="align-middle text-center">72000₫</td>
                <td></td>
            </tr>
            <tr class="fs-6 fw-bold text-danger">
                <td colspan="3"></td>
                <td class="align-middle text-center"></td>
                <td class="align-middle text-center">
                    <a class="link-light btn btn-danger" href="/Pay">Thanh toán</a>
                </td>
                <td colspan=""></td>
            </tr>


        </tbody>
    </table>
</template>
<script>
import { useDataStore } from '../stores/dataStores';
import BooksService from '@/services/books.service';
import axios from 'axios';
import CardOfCart from '../components/CardOfCart.vue';

export default {
    components: {
        CardOfCart
    },
    props: {

    },
    data() {
        return {
            Cart: this.getCartOnCookie(),
            Books: [],
            BookInCart: []
        }
    },
    methods: {
        async retrieveBookOnCookies() {
            // if (useDataStore().getBooks.length !== 0) {
            //     this.Books = useDataStore().getBooks
            // }
            // else {
            try {
                // Lấy tất cả sách trên DataBase 
                this.Books = await BooksService.getAll();
                // Lọc những sách có bookPrice, originalPrice và author
                this.Books = this.Books.filter(itemBook => (itemBook.bookPrice && itemBook.originalPrice && itemBook.author))
                // Lấy sách trong có trong giỏ hàng 
                for (let i = 0; i < this.Cart.length; i++) {
                    let temp = this.Books.find(Book => Book._id === this.Cart[i].idBook);
                    if (temp) {
                        this.BookInCart.push(temp)
                    }
                }
                // console.log(this.BookInCart);
            } catch (error) {
                console.log(error);
            }
            // }
        },

        // Lấy giỏ hàng trên cookies
        async getCartOnCookie() {
            try {
                axios
                    .get(`http://localhost:3000/cookies/read`, {
                        withCredentials: true
                    })
                    .then((response) => {
                        this.Cart = response.data
                        console.log(this.Cart)
                        return response.data
                    })
            } catch (error) {
                console.log(error);
            }
        },

    },
    mounted() {
    },
    created() {
        this.retrieveBookOnCookies();
    }
}
</script>
