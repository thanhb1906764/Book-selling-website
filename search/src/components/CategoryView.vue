<template>
    <div class="content">{{ show }}</div>
    <button type="button" class="btn btn-primary" @click="test1">Primary</button>
    <div class="">
        <v-row :equal="{ sm: true, md: false }">
            <v-col v-for="item in bookList" :key="item._id" class="d-flex align-center justify-center">
                <Cards :book="item" />
            </v-col>
        </v-row>

    </div>
</template>
<script>
import { useDataStore } from '../stores/dataStores';
import Cards from '../components/Cards.vue';
export default {
    components: {
        Cards,
    },
    // data(){
    //     return{
    //         test: useDataStore().getGenreSelected
    //     }
    // },
    updated() {
        this.genreSelected = useDataStore().getGenreSelected
        this.bookList = useDataStore().getBooks,
            this.bookList = this.bookList.filter(book => this.genreSelected.some(item => item == book.genreName))
    },
    mounted() {
        this.genreSelected = useDataStore().getGenreSelected
        this.bookList = useDataStore().getBooks,
            this.bookList = this.bookList.filter(book => this.genreSelected.some(item => item == book.genreName))
    },
    data() {
        return {

            genreList: useDataStore().getGenes,
            bookList: useDataStore().getBooks.filter(itemBook => itemBook.author !== undefined),
            genreSelected: useDataStore().getGenreSelected
        }
    },
    methods: {
        test1() {
            this.genreSelected = useDataStore().getGenreSelected
            this.bookList = useDataStore().getBooks,
                this.bookList = this.bookList.filter(book => this.genreSelected.some(item => item == book.genreName))

            console.log(this.bookList)

        }
    },
    computed: {
        show() {

            return useDataStore().getGenreSelected
        },

    },
    //    watch: {
    //     genreSelected:function(newValue, oldValue) {
    //         // Thực hiện các tác vụ cập nhật giao diện ở đây
    //         this.genreSelected = useDataStore().getGenreSelected
    //         this.bookList=useDataStore().getBooks,
    //         this.bookList=this.bookList.filter(book => this.genreSelected.some(item => item== book.genreName))
    //     }
    //     }
}
</script>

<style>
.content {
    color: green;
}
</style>