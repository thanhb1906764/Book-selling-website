<template>
    <div class="container shadow-sm rounded-3">

        <!-- Chi tiết sản phẩm  -->
        <div style="display: flex;">

            <div style="width: 30rem; padding: 10px;">
                <Carousel_Img :id="this.id" />
            </div>

            <div class="p-2" style="width: 60rem;">
                <h4 class="fw-semibold">{{ Book.bookName }}</h4>

                <div class="row gx-5">
                    <p class="col">
                        Nhà cung cấp:
                        <strong>
                            <a class="text-decoration-none" href="#">{{ Book.supplisherName }}</a>
                        </strong>
                    </p>
                    <p class="col">Nhà xuất bản: <strong>{{ Book.publisher }}</strong></p>
                </div>

                <div class="row gx-5">
                    <p class="col">Tác giả: <strong>{{ Book.author }}</strong></p>
                </div>

                <div class="row gx-5">
                    <p class="col">Kích cỡ: <strong>{{ Book.size }}</strong></p>
                    <p class="col">Số trang: <strong>{{ Book.quantityPage }}</strong></p>
                </div>

                <div style="display: flex; justify-content: start; align-items: center;">
                    <h3 class="text-danger fw-bold">{{ Book.bookPrice }} &#8363;</h3>
                    <h6 v-if="Book.bookPrice !== Book.originalPrice" class="text-decoration-line-through px-2 text-muted">
                        {{ Book.originalPrice }} &#8363;</h6>
                    <h6><span class="badge bg-danger">New</span></h6>
                </div>

                <div class="row gx-5">
                    <p>Số lượng sách còn lại: <strong>{{ Book.bookStock }}</strong></p>
                    <p>Đổi trả trong 30 ngày
                        <Modal />
                    </p>
                </div>

                <div class="row gx-5">
                    <p>Giao hàng đến
                        <span class="px-2">
                            <a class="text-decoration-none" href="#">Thay đổi</a>
                        </span>
                    </p>
                </div>

                <div style="display: flex; justify-content: start; align-items: center;">
                    <div class="px-0 fs-5 me-3">Số lượng</div>
                    <div class="btn-group" role="group" aria-label="Basic outlined">
                        <button type="button" class="btn btn-outline-primary">-</button>
                        <input required type="number" pattern="[0-9]*" class="btn border" step="1" min="1" value="1"
                            :max="Book.bookStock" />
                        <button type="button" class="btn btn-outline-primary">+</button>
                    </div>
                </div>

                <hr />

                <div class="py-3">
                    <a href="/Pay" @click="" class="btn btn-danger">Mua Ngay</a>
                    <span class="px-2"><a href="/Cart" class="btn btn-outline-danger">
                            <!-- <img src="../assets/add_shopping_cart_FILL0_wght400_GRAD0_opsz48.svg" width="20px"> -->
                            Thêm Vào Giỏ Hàng</a></span>
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


            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">Giá sản
                    phẩm trên đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức
                    và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phụ phí đóng gói, phí vận chuyển, phụ phí
                    hàng cồng kềnh,...
                </div>

                <!-- Bình luận  -->
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <CommentForm />

                    <Comments />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Carousel_Img from '../components/Carousel_Img.vue';
import Modal from '../components/Modal.vue';
import Comments from '../components/Comments.vue';
import CommentForm from '../components/CommentForm.vue';

import BooksService from '@/services/books.service'
import ImagesService from '@/services/images.service'
import { useDataStore } from '../stores/dataStores';

export default {
    components: {
        Carousel_Img, Modal, Comments, CommentForm
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            Book: {},
            ImgaeArray: {},
        }
    },
    methods: {
        async getBook() {
            if (useDataStore().getBooks.length !== 0) {
                this.Book = useDataStore().getBooks.filter(book => book._id === this.id)[0]
                // console.log(this.Books);
            }
            else {
                try {
                    this.Book = await BooksService.get(this.id);
                    // console.log(this.Book);
                }
                catch (error) {
                    console.log(error);
                }
            }
        },

        // Lấy tất cả những image của sách  
        async getImggeArray() {
            if (useDataStore().getBooks.length !== 0) {
                this.ImgaeArray = useDataStore().getImages.filter(image => image._idBook === this.id)
                // console.log(this.ImgaeArray)
            }
            else {
                try {
                    this.ImgaeArray = await ImagesService.getAll();
                    useDataStore().setImages(this.ImgaeArray);
                    this.ImgaeArray = this.ImgaeArray.filter(image => image._idBook === this.id)
                    // console.log(this.ImgaeArray)
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    },
    mounted() {
        // console.log(this.Book);
        // console.log(this.id);
        // console.log(this.ImgaeArray);
    },
    created() {
        this.getBook();
        this.getImggeArray();
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