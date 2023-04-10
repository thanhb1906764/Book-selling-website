<template>
    <div class="container">

        <div class="row">
            <div class="col-sm-2">
                <div @click="showAll">Tất cả sản phẩm</div>
                <div class="content fw-bold" @click="showgenre(genreList)">{{ show }}</div>
                <div v-for="item in genreList.subGenre" :key="item" class="genre-item">
                    <div @click="showSubGenre(item)">{{ item }}</div>

                </div>
            </div>
            <div class="col-sm">
                <v-row :equal="{ sm: true, md: false }">
                    <v-col v-for="item in bookList" :key="item._id" class="d-flex align-center justify-center">
                        <Cards :book="item" />
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>
<script>
import { useDataStore } from '../stores/dataStores';
import Cards from '../components/Cards.vue';
export default {
    components: {
        Cards,
    },

    updated() {
        if (this.genreList)
            this.showUI = true
    },
    mounted() {
        this.genreSelected = useDataStore().getGenreSelected
        this.bookList = useDataStore().getBooks
        this.bookList = this.bookList.filter(book => this.genreSelected.some(item => item == book.genreName))


    },
    data() {
        return {
            category: useDataStore().getGenes,
            genreList: [],
            bookList: useDataStore().getBooks,
            genreSelected: useDataStore().getGenreSelected,
            openIndex: null,
            selectedItems: [],
            categorySelected: useDataStore().getCategorySelected,
            showUI: false,
            showfull: 0,
        }
    },
    methods: {
        showAll() {

            this.showfull += 1
        },
        showgenre(data) {
            useDataStore().setGenreSelected(data.subGenre)
            this.genreSelected = useDataStore().getGenreSelected
            console.log(data.subGenre)

        },
        showSubGenre(data) {
            useDataStore().setGenreSelected([data])
            this.genreSelected = useDataStore().getGenreSelected
            console.log(data)
        },
    },
    computed: {
        show() {
            this.genreList = useDataStore().getGenes.filter(item => item.genreName === this.categorySelected)
            this.genreList = this.genreList[0]
            this.categorySelected = useDataStore().getCategorySelected
            this.genreSelected = useDataStore().getGenreSelected
            this.bookList = useDataStore().getBooks
            this.bookList = this.bookList.filter(book => this.genreSelected.some(item => item == book.genreName))
            return this.categorySelected

        },

    },
    watch: {
        genreSelected: function (newValue, oldValue) {
            console.log(newValue)
            // Thực hiện các tác vụ cập nhật giao diện ở đây
            this.genreSelected = useDataStore().getGenreSelected
            this.bookList = useDataStore().getBooks
            this.bookList = this.bookList.filter(book => this.genreSelected.some(item => item == book.genreName))

        },
        categorySelected: function (newValue, oldValue) {
            console.log(newValue)
            this.genreList = useDataStore().getGenes.filter(item => item.genreName === this.categorySelected)[0]

        },
        showfull: function (newValue, oldValue) {
            this.bookList = useDataStore().getBooks

            console.log(newValue)
        }

    }
}
</script>

<style>
.content {
    color: green;
}

.genre-item:hover {
    color: red;
    cursor: pointer;
}
</style>