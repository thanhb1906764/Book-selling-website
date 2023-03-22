<template>
    <div>{{ Cookies }}</div>
    <!-- <div>{{ Books }}</div> -->
    <!-- <router-link :to="{
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
    </router-link> -->
</template>

<script>
import BooksService from '@/services/books.service'
import CartsService from '../services/carts.service';
import { useDataStore } from '../stores/dataStores';
import axios from 'axios'

export default {
    components: {

    },
    data() {

        return {
            Books: [],
            Cookies: [],
            id: '1',
            quan: 12
        }
    },
    methods: {
        async retrieveBook() {
            try {
                axios
                    .get(`http://localhost:3000/cookies/set/${this.id}/${this.quan}`, {
                        withCredentials: true
                    })
                    .then((response) => {
                        this.Cookies = response.data
                        console.log(response)
                    })
                // // this.Cookies = await CartsService.getAll();
                // // this.Cookies = await CookiesService.get()
                // this.Cookies = await CartsService.createCookie(this.id, this.quan);
                // // useDataStore().setBooks(this.Books)
                console.log(this.Cookies)
            } catch (error) {
                console.log(error);
            }
        }
    }, mounted() {

        this.retrieveBook()
    }
}
</script>