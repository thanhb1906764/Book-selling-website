<template>
    <div class="container ">
        <!-- Chi tiết sản phẩm  -->
        <div style="display: flex; justify-content: space-evenly; padding: 20px;" class="row">
            <!-- Hiển thị Images của Book  -->
            <div style="width: max-content; " class="col-sm-2">
                <Carousel_Img :id="this.id" />
            </div>

            <!-- Thông tin Book  -->
            <div class=" col-sm-10" style="width:max-content;">
                <!-- Tên Book  -->
                <h4 class="fw-semibold">{{ Book.bookName }}</h4>

                <!-- Nhà Cung cấp và Xuất bản -->
                <div class="row gx-5">
                    <p class="col">
                        Nhà cung cấp:
                        <a class="text-decoration-none fw-bold link-primary" href="#">{{ Book.supplisherName }}</a>
                    </p>
                    <p class="col">Nhà xuất bản: <strong>{{ Book.publisher }}</strong></p>
                </div>

                <!-- Tác giả  -->
                <div class="row gx-5">
                    <p class="col">Tác giả: <strong>{{ Book.author }}</strong></p>
                </div>

                <!-- Kích cỡ Book và số trang  -->
                <div class="row gx-5">
                    <p class="col">Kích cỡ: <strong>{{ Book.size }}</strong></p>
                    <p class="col">Số trang: <strong>{{ Book.quantityPage }}</strong></p>
                </div>

                <!-- Giá sách... -->
                <div style="display: flex; justify-content: start; align-items: center;">
                    <h3 class="text-danger fw-bold">{{ Book.bookPrice }} &#8363;</h3>
                    <h6 v-if="Book.bookPrice !== Book.originalPrice" class="text-decoration-line-through px-2 text-muted">
                        {{ Book.originalPrice }} &#8363;</h6>
                    <h6><span class="badge bg-danger">New</span></h6>
                </div>

                <!-- Số lượng Book trong kho  -->
                <div class="row gx-5">
                    <p>Số lượng sách còn lại: <strong>{{ TempBookStock }}</strong></p>
                    <p class="">Đổi trả trong 30 ngày
                        <Modal />
                    </p>
                </div>

                <!-- Địa chỉ giao hàng -->
                <!-- <div class="row gx-5">
                    <p>Giao hàng đến
                        <span class="px-2">
                            <a class="text-decoration-none link-primary" href="#">Thay đổi</a>
                        </span>
                    </p>
                </div> -->

                <!-- Số lượng sách sẽ mua  -->
                <div style="display: flex; justify-content: start; align-items: center;">
                    <div class="px-0 fs-5 me-3">Số lượng</div>
                    <div class="btn-group" role="group" aria-label="Basic outlined">
                        <button @click="BookQuantityReduce" type="button" class="btn btn-outline-primary">-</button>
                        <input required type="number" pattern="[0-9]*" class="btn border" step="1" min="1" width="10px"
                            v-model="BookQuantity" :max="this.TempBookStock" />
                        <button @click="BookQuantityIncrease" type="button" class="btn btn-outline-primary">+</button>
                    </div>
                </div>

                <hr />

                <!-- Button  -->
                <div class="py-3">
                    <a href="/Pay" class="btn btn-danger">Mua Ngay</a>
                    <span @click="addProductToCart" class="px-2"><a @click="notify" class="btn btn-outline-danger">Thêm Vào
                            Giỏ Hàng</a></span>
                </div>
            </div>
        </div>


        <!-- Thông tin sản phẩm và bình luận  -->
        <div class="" style="margin-top: 10px; padding: 10px;">

            <!-- Thanh điều hướng  -->
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active fw-bold" id="nav-home-tab" data-bs-toggle="tab"
                        data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home"
                        aria-selected="true">Thông tin sản phẩm</button>
                    <button class="nav-link fw-bold" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile"
                        type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Đánh giá</button>
                </div>
            </nav>

            <!-- Review -->
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    {{ Book.bookDes }}
                </div>

                <!-- Bình luận  -->
                <div v-if="show" class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <CommentForm :idBook="id" @submitComment="getComment" />
                    <div v-for="i in commentList" :key="i._id">
                        <Comments :comment="i" />
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Import here 
import Carousel_Img from '../components/Carousel_Img.vue';
import Modal from '../components/Modal.vue';
import Comments from '../components/Comments.vue';
import CommentForm from '../components/CommentForm.vue';
import BooksService from '@/services/books.service'
import ImagesService from '@/services/images.service'
import { useDataStore } from '../stores/dataStores';
import CommentsService from '@/services/comments.service';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
    components: {
        Carousel_Img, Modal, Comments, CommentForm
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        // Đinh nghĩa thông báo nổi 
        // const notify = () => {
        //     console.log(this.Cart);
        //     if (this.Cart.find(item => item.idBook === this.id)) {
        //         window.location.href = "/Cart";
        //     }
        //     toast("Đã Thêm Sản Phẩm Vào Giỏ Hàng", {
        //         autoClose: 1500,
        //         limit: 1,
        //         type: toast.TYPE.SUCCESS,
        //         multiple: false,
        //     }); // ToastOptions                            
        //     this.notify = function () {
        //         window.location.href = "/Cart";
        //         return 0;
        //     };
        // }
        return {
            TempBookStock: null,
            BookQuantity: 1,
            BookStock: this.getBookStock,
            Book: {},
            ImgaeArray: {},
            show: false,
            commentList: []
            // notify: notify,
            // Cart: [],
        }
    },
    computed: {
        // getBookStock() {
        //     if ((this.BookQuantity > this.TempBookStock) || (this.BookQuantity < 0)) {
        //         alert(`Số lượng sách ${this.BookQuantity} là không hợp lệ.`);
        //         this.BookQuantity = 1;
        //         return this.TempBookStock - this.BookQuantity;
        //     } else {
        //         this.Book.bookStock = this.TempBookStock - this.BookQuantity;
        //         console.log(this.Book.bookStock);
        //         return this.TempBookStock - this.BookQuantity;
        //     }
        // }
    },
    methods: {
        // Cập nhật dữ liệu vào store và chuyển sang trang Pay
        PayClick() {

        },

        // Tăng số lượng sách
        BookQuantityIncrease() {
            if (this.getBookStock > 0) {
                this.BookQuantity++;
                this.BookStock--;
                // Cập nhật Book.bookStock 
                this.Book.bookStock--;
                console.log(this.Book.bookStock);
            }
        },
        // Giảm số lượng sách 
        BookQuantityReduce() {
            if (this.BookQuantity > 0) {
                this.BookQuantity--;
                this.BookStock++;
                // Cập nhật Book.bookStock 
                this.Book.bookStock++;
                console.log(this.Book.bookStock);
            }
        },

        // Thêm sản phẩm vào giỏ hàng trong Cookies 
        // async addProductToCart() {
        //     try {
        //         axios
        //             .get(`http://localhost:3000/cookies/set/${this.id}/${this.BookQuantity}`, {
        //                 withCredentials: true
        //             })
        //             .then((response) => {
        //                 console.log(response.data)
        //             })
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },

        // Lấy carts từ cookies
        // async getCookiesToCheck() {
        //     try {
        //         axios
        //             .get(`http://localhost:3000/cookies/read`, {
        //                 withCredentials: true
        //             })
        //             .then((response) => {
        //                 // Gán biến để kiểm tra sản phẩm đã có trong cart hay chưa 
        //                 this.Cart = response.data
        //                 // console.log(this.Cart)
        //             })
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },

        // Lấy Book trong store (nếu có) hoặc từ DB
        async getBook() {
            if (useDataStore().getBooks.length !== 0) {
                this.Book = useDataStore().getBooks.filter(book => book._id === this.id)[0];
                this.TempBookStock = this.Book.bookStock
            }
            else {
                try {
                    this.Book = await BooksService.get(this.id);
                    this.TempBookStock = this.Book.bookStock
                }
                catch (error) {
                    console.log(error);
                }
            }
        },

        // Lấy tất cả những image của Book trong store (nếu có) hoặc từ DB
        async getImggeArray() {
            if (useDataStore().getBooks.length !== 0) {
                this.ImgaeArray = useDataStore().getImgBook.filter(image => image._idBook === this.id);
            }
            else {
                try {
                    this.ImgaeArray = await ImagesService.getAll();
                    useDataStore().updateImgBook(this.ImgaeArray);
                    this.ImgaeArray = this.ImgaeArray.filter(image => image._idBook === this.id);
                }
                catch (error) {
                    console.log(error);
                }
            }
        },
        async getComment() {
            var kq = await CommentsService.getAll()
            this.commentList = kq.filter(item => item._idBook === this.id)
        }
    },
    mounted() {

    },
    created() {
        // Lấy dữ liệu trước khi kết xuất 
        // this.getCookiesToCheck(); // Do hàm này chỉ run 1 lần nên cần thêm code để xem Book có trong Cart hay không 
        this.getBook();
        this.getImggeArray();
        this.getComment()
        this.show = true
    }
}
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>