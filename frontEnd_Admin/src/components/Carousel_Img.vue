<template>
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <!-- <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
        </div> -->
        <div class="carousel-inner rounded-3 border">
            <div v-for="item in ImgaeArray" :key="item._id" class="carousel-item active text-center">
                <img :src="item.linkImage" class="" height="450" alt="...">
            </div>
        </div>
        <button v-if="ImgaeArray.length > 1" class="carousel-control-prev" type="button"
            data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon btn btn-danger" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button v-if="ImgaeArray.length > 1" class="carousel-control-next" type="button"
            data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon btn btn-danger" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<script>
import ImagesService from '@/services/images.service'
import { useDataStore } from '../stores/dataStores';
export default {
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            ImgaeArray: {},
        }
    },
    methods: {

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
                    console.log(this.ImgaeArray)
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    },
    mounted() {
        console.log(this.id);
    },
    created() {
        this.getImggeArray();
    }
}
</script>