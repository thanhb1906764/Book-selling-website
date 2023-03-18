<template>
    <div>{{ Books }}</div>
    <router-link :to="{
        name: 'BookDetails',
        params: { id: '123' },
    }">
        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                    content.</p>
            </div>
        </div>
    </router-link>
</template>

<script>
import BooksService from '@/services/books.service'
import { useDataStore } from '../stores/dataStores';

export default {
    components: {
        BooksService,
        useDataStore
    },
    data() {

        return {
            Books: [],
        }
    },
    methods: {
        async retrieveBook() {
            try {
                this.Books = await BooksService.getAll();
                useDataStore().setBooks(this.Books)
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        this.retrieveBook()
    }

}
</script>