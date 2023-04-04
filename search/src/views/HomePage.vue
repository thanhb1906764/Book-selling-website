<template>
    <div class="container">
        <!-- Carousel - Hiển thị những sản phẩm đặt biệt hoặc một chương trình giảm giá... need-fix -->
        <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner rounded-2 shadow-lg">
                <div class="carousel-item active" data-bs-interval="3000">
                    <img src="https://theme.hstatic.net/200000343865/1000938429/14/ms_banner_img4.jpg?v=335"
                        class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item" data-bs-interval="2000">
                    <img src="https://theme.hstatic.net/200000343865/1000938429/14/ms_banner_img4.jpg?v=335"
                        class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item" data-bs-interval="2000">
                    <img src="https://theme.hstatic.net/200000343865/1000938429/14/ms_banner_img4.jpg?v=335"
                        class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon btn btn-danger" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"
                data-bs-slide="next">
                <span class="carousel-control-next-icon btn btn-danger" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <!-- Các thành phần - nội dung chính trong trang   -->
        <div id="content">
            <div class="p-2 fw-semibold fs-5 text-center">
                <a href="#product" class="text-danger text-decoration-none px-2 btn">Sản Phẩm</a>
            </div>
        </div>
        <!-- Sản phẩm -->
        <div id="product" class="">
            <div class="p-2 fw-semibold fs-5" style="background-color:  #55a1e7;">
                <div class="text-white text-decoration-none">Sản Phẩm</div>
            </div>
            <div class="px-0 py-2" v-if="Books">
                <v-row class="p-2 m-0" :equal="{ sm: true, md: false }">
                    <keep-alive>
                        <v-col v-for="item in Books" :key="item._id" class="d-flex align-center justify-center">
                            <Cards :book="item" />
                        </v-col>
                    </keep-alive>

                </v-row>
            </div>
        </div>
    </div>
</template>

<script>
// Import here
import Cards from '../components/Cards.vue';
import { mdiApps } from '@mdi/js'
import moment from 'moment';

import BooksService from '@/services/books.service'
import { useDataStore } from '../stores/dataStores';
export default {
    components: {
        Cards
    },
    data() {
        return {
            Books: useDataStore().getBooks.filter(itemBook => itemBook.author !== undefined),
            Images: useDataStore().getImages,
            loaded: false,
            geneList: useDataStore().getGenes,

        }
    },
    methods: {
        // Lấy tất cả Image từ DB và lưu vào store
        async retrieveImage() {
            try {
                this.Images = await ImagesService.getAll();
                useDataStore().setImages(this.Images)
            } catch (error) {
                console.log(error);
            }
            this.loaded = true
        },
    },
    mounted() {
        // this.retrieveImage();
        console.log(this.Books)
    },
    created() {


    }
}
</script>

<style></style>