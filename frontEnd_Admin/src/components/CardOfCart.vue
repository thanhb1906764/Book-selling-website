<template>
    <!-- Image -->
    <th scope="row">
        <router-link :to="{
            name: 'BookDetails',
            params: { id: Book._id },
        }">
            <img class="imgCart border rounded" :src="linkImage">
        </router-link>
    </th>

    <td class="align-middle">
        <router-link :to="{
            name: 'BookDetails',
            params: { id: Book._id },
        }">
            <div class="fs-6 fw-bold text-danger">{{ Book.bookName }}</div>
            <!-- Thông tin khuyến mãi  -->
            <small>{{ }}</small>
            <small class="d-block">Còn lại: {{ Book.bookStock }}</small>
        </router-link>
    </td>

    <td class="align-middle text-center">
        {{ (Book.bookPrice).toLocaleString('vi-VN', {
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
        {{ (Book.bookPrice * 2).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }) }}
    </td>

    <td class="align-middle text-center">
        <button class="btn btn-outline-danger fa-solid fa-trash"></button>
    </td>
</template>
<script>
// Import here
import ImagesService from '@/services/images.service'
import { useDataStore } from "../stores/dataStores";

export default {
    props: {
        Book: Object, // get Book từ HomePage
    },
    data() {
        return {
            linkImage: null, // linkImage của Book lấy từ store
            ImgaeArray: []
        }
    },
    methods: {
        // Lấy tất cả những image của sách  
        async getImageArray() {
            if (useDataStore().getBooks.length !== 0) {
                this.ImgaeArray = useDataStore().getImages.filter(image => image._idBook === this.Book._id);
                this.linkImage = this.ImgaeArray.filter(image => image._idBook === this.Book._id)[0].linkImage;

            }
            else {
                try {
                    this.ImgaeArray = await ImagesService.getAll();
                    useDataStore().setImages(this.ImgaeArray);
                    let temp = this.ImgaeArray.filter(image => image._idBook === this.Book._id)
                    this.linkImage = temp[0].linkImage;
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    },
    mounted() {

    },
    created() {
        this.getImageArray();
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