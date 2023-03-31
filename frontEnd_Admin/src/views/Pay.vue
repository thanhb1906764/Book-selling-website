<template>
    <title>Thông tin vận chuyển - Đặt hàng</title>
    <div class="container-sm text-dark py-2">
        <div class="row">
            <!-- Nội dung bên trái: Thông tin khách hàng và địa chỉ giao hàng -->
            <div class="col-auto col-sm-6">
                <!-- Thanh điều hướng  -->
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">

                        <div class="collapse navbar-collapse" id="navbarNav">

                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <small><a class="nav-link" aria-current="page" href="/Cart">Giỏ hàng</a></small>
                                </li>
                                <li class="nav-item">
                                    <small><a class="nav-link disabled user-select-none" aria-current="page"
                                            href="/Pay">></a></small>
                                </li>
                                <li class="nav-item">
                                    <small><a class="nav-link active" href="#">Thông tin vận chuyển - Đặt hàng</a></small>
                                </li>

                            </ul>

                        </div>

                    </div>

                </nav>

                <!-- Tiêu đề -->
                <div class="container">
                    <div class="p-2 fs-5">
                        Thông tin đơn hàng
                    </div>
                </div>

                <!-- Thẻ, chứa thông tin người dùng (Tên, email, nút đăng xuất), nếu người dùng chưa đăng nhập sẽ không hiển thị -->
                <div v-if="name !== null" class="container">
                    <ul class="list-group px-2">
                        <li class="list-group-item fw-bolder">
                            <div><a class="me-2 fa-solid fa-user"></a>{{ name }}<a href="#"
                                    class="text-decoration-none mx-2 text-danger">Đăng xuất</a></div>
                        </li>
                    </ul>
                </div>


                <!-- Input thông tin người dùng -->
                <div class="container">
                    <div class="p-2">

                        <!-- Địa chỉ giao hàng, nếu đã đăng nhập -->
                        <div v-if="name !== null" class="form-group form-floating mb-2">
                            <select class="form-select" aria-label="Default select example">
                                <option v-for="address in addressList" :key="address._id" selected>{{ address.ward }}, {{
                                    address.district }}, {{ address.city }}</option>
                            </select>
                            <label class="fs-6" for="floatingInput">Địa chỉ</label>
                        </div>

                        <!-- Tên khách hàng -->
                        <div class="form-floating mb-2">
                            <input type="email" class="form-control" placeholder="name@example.com"
                                v-model="order.userName">
                            <label class="fs-6" for="floatingInput">Họ tên</label>
                        </div>

                        <!-- Số điện thoại  -->
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" placeholder="name@example.com" v-model="order.phone">
                            <label class="fs-6" for="floatingInput">Số điện thoại</label>
                        </div>


                        <!-- Địa chỉ - input-->
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" v-model="order.reAddress">
                            <label class="fs-6" for="floatingInput">Địa chỉ</label>
                        </div>


                        <!-- Chọn Tỉnh, Quận, Huyện theo Select -->
                        <!-- <AddressVue /> -->


                        <!-- Chọn phương thức thanh toán -->
                        <div class="form-group form-floating mb-2">
                            <select required class="form-select" aria-label="" v-model="order.payment">
                                <!-- <option selected value="payment">Chọn phương thức thanh toán</option> -->
                                <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
                                <option value="Chuyển khoản">Chuyển khoản</option>
                            </select>
                            <label class="fs-6" for="payment">Phương thức thanh toán</label>
                        </div>


                        <!-- Nút Giỏ hàng và Chọn phương thức thanh toán -->
                        <div class="d-flex justify-content-end">
                            <!-- <a class="btn btn-outline-primary">Giỏ hàng</a> -->
                            <button @click="submitOrder" class="btn btn-primary">Đặt hàng</button>
                        </div>

                    </div>
                </div>

            </div>

            <!-- Ngắt cột cho thích hợp với giao điện di động  -->
            <!-- <div class="w-100"></div> -->

            <!-- Nội dung bên phải: Thông tin thông tin sản phẩm, giảm giá -->
            <div class="col-auto col-sm-6 border-start">

                <!-- Danh sách sản phẩm - sách  -->
                <div v-for="item in BookInCart" :key="item._id" class="container">
                    <PayCardsVue :Book="item" :Cart="Cart" />
                </div>

                <!-- Mã giảm giá  -->

                <!-- Giá gốc -->
                <!-- <div class="container">

                    <div class="d-flex justify-content-between py-2">
                        <small class="text-secondary">Giá gốc</small>
                        <small class="">36000đ</small>
                    </div>

                </div> -->


                <!-- <hr /> -->
                <!-- Tạm tính, Phi Ship -->
                <div class="container px-5">

                    <div class="d-flex justify-content-between py-2">
                        <small class="text-muted">Tính tạm</small>
                        <small v-bind="order.totalProductMoney" class="">{{ (tempCost).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }) }}</small>
                    </div>
                    <!-- Phí Ship  -->
                    <div class="d-flex justify-content-between">
                        <small class="text-muted">Phí Ship</small>
                        <small class="" v-bind="order.orderTotal">{{ (shipFee).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }) }}</small>
                    </div>

                </div>


                <hr />
                <!-- Tổng tiền -->
                <div class="container px-5">

                    <div class="d-flex justify-content-between">
                        <div class="text-muted fs-6">Tổng tiền</div>
                        <div class="fw-bolder">{{ (shipFee + tempCost).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }) }}</div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
// import here
import AddressVue from '../components/Address.vue';
import PayCardsVue from '../components/PayCards.vue';
import { useDataStore } from '../stores/dataStores';
import BooksService from '@/services/books.service';
import ShipFeeService from '@/services/shipFee.service';
import AddressesService from '@/services/addresses.service';
import OrdersService from '@/services/orders.service';

import axios from 'axios';
import { number } from 'yup';
export default {
    components: {
        AddressVue,
        PayCardsVue,
    },
    data() {
        return {
            ImageArray: [],
            name: '', // Tên user, nếu người dùng có đăng nhập 
            shipFee: this.getShipFee(),
            tempCost: 0,
            user: {},
            bookList: [],
            BookInCart: [], // Lưu những book có trong giỏ hàng 
            Cart: [], // Lưu số lượng, id sách được đặt hàng
            addressList: [],
            addressDefault: {},
            order: {
                type: Object,
                required: true,
                reDate: new Date(0),
                orderDate: new Date(),
                orderStatus: 'Chờ xác nhận',
                userId: localStorage.getItem('_id'),
            },
        }
    },
    computed: {
        getOrderTotal() {
            return this.shipFee + this.tempCost;
        },
        getTotalProductMoney() {
            return this.tempCost;
        }
    },
    methods: {
        orderTotal(tempCost, shipFee) {
            return tempCost + shipFee;
        },
        // Lấy địa chỉ của người dùng nếu có đăng nhập 
        async getAddressList() {
            let addressList = await AddressesService.getAll();
            addressList = addressList.filter(address => address._idUser === '63fd659dfb9d13249a5499b5')
            console.log('Address');
            console.log(addressList);
            this.addressList = addressList;
            this.addressDefault = addressList.filter(address => address?.default === true)[0]
            console.log('Address default');
            console.log(this.addressDefault);
            return addressList;
        },

        // Lấy shipFee 
        async getShipFee() {
            try {
                let temp = await ShipFeeService.getAll();
                this.shipFee = temp[0].shipFee;
                console.log('shipFee ' + this.shipFee)
                this.order.shipFee = this.shipFee
                return this.shipFee
            }
            catch (error) {
                console.log(error);
            }
        },

        // Lấy sách có trong giỏ hàng
        async retrieveBookOnCart() {
            try {
                // Lấy tất cả sách trên DataBase 
                // this.bookList = await BooksService.getAll();
                // Lấy tất cả sách từ store, để lấy giá khuyến mãi 
                this.bookList = useDataStore().getBooks

                // Lọc những sách có bookPrice, originalPrice và author
                this.bookList = this.bookList.filter(itemBook => (itemBook.bookPrice && itemBook.originalPrice && itemBook.author))
                console.log('useData');
                console.log(this.bookList);
                console.log(this.Cart);
                // Lấy sách trong có trong giỏ hàng 
                this.order.productList = []
                for (let i = 0; i < this.Cart.length; i++) {
                    let temp = this.bookList.find(Book => Book._id === this.Cart[i].idBook);
                    let tempProduct = {}
                    if (temp) {
                        // Tạo đối tượng để thêm sản phẩm vào productList 
                        tempProduct = {
                            _idBook: temp._id,
                            quantity: parseInt(this.Cart[i].quantityBook, 10),
                            price: temp.bookPrice,
                        }
                        this.order.productList.push(tempProduct)
                        this.BookInCart.push(temp)
                    }
                }

                console.log('BookList in cart');
                console.log(this.BookInCart);
                let quantity

                // Tính tạm giá trị các Book trong Cart, chưa tính shipFee 
                for (let i = 0; i < this.BookInCart.length; i++) {
                    quantity = this.Cart.find(item => item.idBook === this.BookInCart[i]._id).quantityBook
                    console.log(quantity);
                    this.tempCost = this.tempCost + (this.BookInCart[i].bookPrice * parseInt(quantity, 10))
                    // console.log(this.BookInCart[i].bookPrice);
                }
                // console.log(this.tempCost);
                this.order.totalProductMoney = this.tempCost
            } catch (error) {
                console.log(error);
            }
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
                        console.log('Cart on cookies');
                        console.log(this.Cart)
                        // Lấy sách 
                        this.retrieveBookOnCart();
                        return response.data
                    })
            } catch (error) {
                console.log(error);
            }
        },

        // submit
        async submitOrder() {
            try {
                // Nếu không có sách trong giỏ hàng thì không được đặt hàng
                if (this.BookInCart.length === 0) {
                    alert('Không có sản phẩm nào trong giỏ');
                    return 0;
                }
                console.log(this.order);
                this.order.orderTotal = this.orderTotal(this.tempCost, this.shipFee);
                let order = await OrdersService.create(this.order)
                if (order === undefined)
                    alert('Tạo đơn hàng không thành công');
                else {
                    // Kiểm tra order 
                    console.log(order);
                    // Cập nhật bookStock cho book 
                    let book = Object
                    let quantityBook

                    for (let i = 0; i < this.BookInCart.length; i++) {
                        quantityBook = this.Cart.find(book => book.idBook === this.BookInCart[i]._id).quantityBook
                        let book = await BooksService.get(this.BookInCart[i]._id);
                        // console.log(quantityBook);
                        book = {
                            bookStock: (parseInt(book.bookStock, 10) - parseInt(quantityBook, 10))
                        }
                        await BooksService.update(this.BookInCart[i]._id, book)
                    }
                    // Destroy cookies giỏ hàng - cart sau khi đặt hàng thành công
                    this.deleteCart();
                    // Chuyển hướng đến trang ...
                    // this.$router.push('/');
                }
            }
            catch (error) {
                console.log(error);
            }
        },

        // Xoá cookie giỏ hàng 
        async deleteCart() {
            try {
                axios
                    .get(`http://localhost:3000/cookies/clear`, {
                        withCredentials: true
                    })
                    .then((response) => {
                        console.log(response.data)
                    })
            } catch (error) {
                console.log(error);
            }
        },

    },
    mounted() {
        // console.log(this.addressList);
    },
    created() {
        this.name = localStorage.getItem('_id');
        // this.name = '63fd659dfb9d13249a5499b5'
        this.Cart = this.getCartOnCookie();
        this.retrieveBookOnCart();
        // this.getShipFee()
        this.getAddressList();
    }

}
</script>