<template>
    <!-- Link đến trang Chi tiết sản phẩm  -->
    <router-link :to="{
        name: 'BookDetails',
        params: { id: book._id },
    }">

        <!-- Phần hiển thị của Cart trên HomePage  -->
        <v-hover v-slot="{ isHovering, props }" open-delay="200">

            <v-tooltip :text="book.bookName"></v-tooltip>

            <v-card class="mx-auto text-center" width="15rem" :elevation="isHovering ? 16 : 2"
                :class="{ 'on-hover': isHovering }" v-bind="props">
                <!-- Khuyến mãi, new... -->
                <span class="badge text-bg-danger text-uppercase"
                    style="position: absolute;z-index: 2;  margin: 5px; max-height: 30px; left: -5px; top: -5px;">
                    <h6 v-if="book.bookPrice !== book.originalPrice">Sale</h6>
                    <h6 v-else-if="!checkMonth(book.receiptDate)">New</h6>
                </span>
                <!-- Hình ảnh  -->
                <img class="" style="height: 250px;" :src="linkImage">

                <!-- Tên sách  -->
                <v-card-title class="py-0 pt-0 ps-2 fs-6 fw-bold" style="text-overflow: ellipsis;">{{
                    book.bookName
                }}</v-card-title>
                <!-- Số lượng đánh giá sao của Book  -->
                <v-card-subtitle class="p-0"><span>{{ counterComement }} đánh giá</span></v-card-subtitle>

                <v-card-text class="p-0">
                    <div class="" v-if="book.originalPrice !== book.bookPrice">
                        <div class="card-text d-flex justify-content-between m-0">
                            <div class="fw-bold m-1 fs-6" style="color: orange; ">{{
                                (book.bookPrice).toLocaleString('vi-VN', {
                                    style: 'currency', currency:
                                        'VND'
                                }) }}
                            </div>
                            <div class="text-muted text-decoration-line-through m-1" style="font-size: 14px;">{{
                                (book.originalPrice).toLocaleString('vi-VN',
                                    {
                                        style: 'currency', currency:
                                            'VND'
                                    }) }}</div>
                        </div>
                        <testTime class="" :time="book.promotionTime" @messageSent="handleMessage" />
                    </div>
                    <div v-else>
                        <h4 class="fw-bold fs-6 m-1" style="color: red;">{{ (book.bookPrice).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }) }}</h4>
                    </div>
                </v-card-text>
            </v-card>
        </v-hover>
    </router-link>
</template>

<script>
// Import here
import moment from 'moment';
import { useDataStore } from "../stores/dataStores";
import testTime from '../components/testTime.vue'
import { Countdown } from 'vue3-flip-countdown';
import ImagesService from '@/services/images.service'
import CommentsService from '@/services/comments.service'
export default {
    components: {
        testTime, Countdown
    },
    data() {
        return {
            ImageArray: [],
            linkImage: null, // linkImage của Book lấy từ store
            Images: [], // Lấy hình ảnh từ store hoặc cloud
            time: moment(new Date(), "YYYY-MM-DD HH:mm:ss"),
            counterComement: Object
        }
    },
    props: {
        book: Object, // get book từ HomePage
    },
    methods: {
        // Lấy tất cả Image của của một Book cụ thể
        async getImageArray() {
            if (useDataStore().getImages.length !== 0) {
                this.ImageArray = useDataStore().getImages.find(image => image._idBook === this.book._id)
            }
            else {
                try {
                    this.ImageArray = await ImagesService.getAll();
                    useDataStore().setImages(this.ImageArray);
                    this.ImageArray = this.ImageArray.find(image => image._idBook === this.book._id)
                }
                catch (error) {
                    console.log(error);
                }
            }
            // Lấy dữ liệu Images
            this.linkImage = this.ImageArray.linkImage
        },
        // Đếm số lượng comment của một cuốn sách cụ thể 
        async counterComment() {
            let commentList = await CommentsService.getAll();
            this.counterComement = commentList.filter(item => item._idBook === this.book._id).length;
        },
        // New
        checkMonth(date) {
            const dateToCheck = new Date(date);
            // Lấy thời gian hiện tại
            const currentTime = new Date().getTime();

            // Tính toán thời gian đã trôi qua kể từ ngày cần kiểm tra
            const timePassed = currentTime - dateToCheck.getTime();

            // Tính toán số mili giây trong 1 tháng
            const monthInMilliseconds = 1000 * 60 * 60 * 24 * 30;

            // Kiểm tra xem thời gian đã trôi qua có đủ 1 tháng hay chưa
            if (timePassed >= monthInMilliseconds) {
                return true
            }

            return false
        },
        handleMessage() {
            // this.book.promotionTime = null
            useDataStore().updateBook(this.book._id)
        }
    },
    mounted() {

    },
    created() {
        this.counterComment();
        this.getImageArray();
    }
}
</script>
<style>
.v-card.on-hover.v-theme--dark {
    background-color: rgba(#FFF, 0.8)
}
</style>