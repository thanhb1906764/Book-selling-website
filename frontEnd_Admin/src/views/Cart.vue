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
                <CartCards :Book="item" :Cart="Cart" @updateCart="update" />
            </tr>
            <!-- Thanh toán  -->
            <tr class="fs-6 fw-bold text-danger">
                <td colspan="3"></td>
                <td class="align-middle text-center">Tính tạm</td>
                <td class="align-middle text-center">{{ (tempCost).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                }) }}</td>
                <td></td>
            </tr>
            <tr class="fs-6 fw-bold text-danger">
                <td colspan="3"></td>
                <td class="align-middle text-center"></td>
                <td class="align-middle text-center">
                    <a class="link-light btn btn-danger" href="/Inform">Thanh toán</a>
                </td>
                <td colspan=""></td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import { useDataStore } from '../stores/dataStores';
import axios from 'axios';
import CartCards from '../components/CartCards.vue';
export default {
    components: {
        CartCards
    },
    // emits: ['updateCart'],
    data() {
        return {
            Cart: [],
            Books: [],
            BookInCart: [],
            tempCost: 0,
            show: true
        }
    },
    methods: {
        async retrieveBookOnCookies() {
            try {
                // Lấy tất cả sách trên DataBase 
                this.Books = useDataStore().getBooks;
                // Lọc những sách có bookPrice, originalPrice và author
                this.Books = this.Books.filter(itemBook => (itemBook.bookPrice && itemBook.originalPrice && itemBook.author))
                // Lấy sách trong có trong giỏ hàng 
                console.log(this.Cart);
                for (let i = 0; i < this.Cart.length; i++) {
                    let temp = this.Books.find(Book => Book._id === this.Cart[i].idBook); console.log(temp);
                    if (temp) {
                        this.BookInCart.push(temp)
                        console.log(temp);
                    }
                }
                console.log('BookList in cart');
                console.log(this.BookInCart);
                let quantity
                // Tính tạm giá trị các Book trong Cart, chưa tính shipFee 
                if (this.BookInCart.length !== 0) {
                    for (let i = 0; i < this.BookInCart.length; i++) {
                        quantity = this.Cart.find(item => item.idBook === this.BookInCart[i]._id).quantityBook
                        console.log(quantity);
                        this.tempCost = this.tempCost + (this.BookInCart[i].bookPrice * parseInt(quantity, 10))
                        // In giá trị tính tạm 
                        console.log('TempCost');
                        console.log(this.BookInCart[i].bookPrice);
                    }
                }
                else {
                    this.tempCost = 0
                }
                console.log(this.tempCost);
            } catch (error) {
                console.log(error);
            }
        },
        // Lấy giỏ hàng trên cookies
        async getCartOnCookie() {
            try {
                await axios
                    .get(`http://localhost:3000/cookies/read`, {
                        withCredentials: true
                    })
                    .then((response) => {
                        this.Cart = response.data
                        this.retrieveBookOnCookies();
                        console.log(this.Cart)
                        return response.data

                    })
                this.show = true
            } catch (error) {
                console.log(error);
            }
        },
        // Update ui
        async update() {
            // this.$emit('updateCart');
            this.show = false
            this.BookInCart = []
            this.Cart = []
            this.getCartOnCookie();
            this.retrieveBookOnCookies();
            this.show = true
            console.log();
        }
    },
    updated() {
    },
    mounted() {
    },
    created() {
        this.getCartOnCookie()
    }
}
</script>
