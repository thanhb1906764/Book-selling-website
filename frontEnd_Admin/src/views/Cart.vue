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
                <th scope="row">
                    <a href="#">
                        <img class="imgCart border rounded"
                            src="https://product.hstatic.net/200000343865/product/4_5f9624b1ec774721962320840ac57f15_master.jpg">
                    </a>
                </th>
                <td class="align-middle">
                    <a href="#" class="text-decoration-none">
                        <div class="fs-6 fw-bold text-danger">{{ item.bookName }}</div>
                    </a>
                    <!-- Thông tin khuyến mãi  -->
                    <small>{{ }}</small>
                    <small class="d-block">Còn lại: {{ item.bookStock }}</small>
                </td>

                <td class="align-middle text-center">
                    {{ (item.bookPrice).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    }) }}
                </td>

                <td class="align-middle text-center">
                    <div class="btn-group" role="group" aria-label="Basic outlined">
                        <button type="button" class="btn btn-outline-primary">-</button>
                        <input type="number" pattern="[0-9]*" class="btn border" step="1" min="1" value="1" max="99" />
                        <button type="button" class="btn btn-outline-primary">+</button>
                    </div>
                </td>

                <td class="align-middle text-center fw-bold">
                    {{ (item.bookPrice * 2).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    }) }}
                </td>

                <td class="align-middle text-center">
                    <button class="btn btn-outline-danger fa-solid fa-trash"></button>
                </td>
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

export default {
    props: {

    },
    data() {
        return {
            Cart: [],
            Books: [],
            BookInCart: []
        }
    },
    methods: {

        // Lấy tất cả những image của sách  
        // async getImggeArray() {
        //     if (useDataStore().getBooks.length !== 0) {
        //         this.ImgaeArray = useDataStore().getImages.filter(image => image._idBook === this.id)
        //         // console.log(this.ImgaeArray)
        //     }
        //     else {
        //         try {
        //             this.ImgaeArray = await ImagesService.getAll();
        //             useDataStore().setImages(this.ImgaeArray);
        //             this.ImgaeArray = this.ImgaeArray.filter(image => image._idBook === this.id)
        //             console.log(this.ImgaeArray)
        //         }
        //         catch (error) {
        //             console.log(error);
        //         }
        //     }
        // },
        async retrieveBookOnCookies() {
            if (useDataStore().getBooks.length !== 0) {
                this.Books = useDataStore().getBooks
            }
            else {
                try {
                    this.Books = await BooksService.getAll();
                    this.Books = this.Books.filter(itemBook => (itemBook.bookPrice && itemBook.originalPrice && itemBook.author))
                    console.log(this.Cart);
                    for (let i = 0; i < this.Cart.length; i++) {
                        let temp = this.Books.find(Book => Book._id === this.Cart[i].idBook);
                        if (temp) {
                            this.BookInCart.push(temp)
                        }
                    }
                    console.log(this.BookInCart);
                    // location.reload();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        // Lấy cart trong cookies
        async getCartOnCookie() {
            try {
                axios
                    .get(`http://localhost:3000/cookies/read`, {
                        withCredentials: true
                    })
                    .then((response) => {
                        // console.log(response.data)
                        this.Cart = response.data
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
        this.getCartOnCookie();

    }
}
</script>
<style scoped>
.imgCart {
    width: 100px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>