<script >
import Nav from './components/TheWelcome.vue';
// import Card from './components/Cards.vue'
// import BookDetails from './components/Book_Details.vue'
// import UploadsFile from './components/UploadsFile.vue';
// import Catalog_management from './view/Catalog_Management.vue';
// import PromotionVue from './view/Promotion_Managemnet.vue';
// import PromotionForm from './components/PromotionForm.vue'
// import Account_Clients from './view/Clients_Management.vue';
// import Book_Receipt from './components/Book_Receipt.vue';
// import Order_Management from './view/Order_Management.vue';
// import Receipt_List from './view/Receipt_Management.vue';
// import Product_Management from './view/Product_Management.vue';
// import ChartsVue from './components/Charts.vue';
// import Statistical from './view/Statistical.vue';
// import TestTime from './components/testTime.vue';

import HomePage from './views/HomePage.vue';
import HeaderVue from './components/Header.vue';
import FooterVue from './components/Footer.vue';
import { useDataStore } from './stores/dataStores';
import BooksService from '@/services/books.service';
import PromotionsService from '@/services/promotions.service';

// model - Hiển thị đăng nhập, đăng ký mà không cần chuyển trang 
import LoginUser from './components/LoginUser.vue';
import RegisterUser from './components/RegisterUser.vue';
import moment from 'moment';

export default {
    components: {
        Nav,
        HeaderVue,
        HomePage,
        FooterVue,
        LoginUser,
        RegisterUser,
        // Card, BookDetails, UploadsFile, Catalog_management, PromotionVue, Product_Management,
        // PromotionForm, Account_Clients, Book_Receipt, Order_Management, Receipt_List, ChartsVue, Statistical, TestTime
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        async retrieveBook() {
            try {
                this.Books = await BooksService.getAll();
                this.Books = this.Books.filter(itemBook => (itemBook.bookPrice && itemBook.originalPrice && itemBook.author))
                useDataStore().setBooks(this.Books)
                this.show = true
                console.log(this.Books)
                this.checkPromotion()
            } catch (error) {
                console.log(error);
            }
        },
        async checkPromotion() {
            var proList = await PromotionsService.getAll()
            var waitingList = []
            for (var i of proList) {
                const now = new Date();
                if (now > new Date(i.promotionEnd)) {
                    console.log("Đã kết thúc")
                }
                else if (now < new Date(i.promotionBegin)) {
                    console.log("Yet")
                    const promotionBegin = moment(i.promotionBegin)
                    var duration = moment.duration(promotionBegin.diff(now)).asMinutes();
                    if (duration < 30) {
                        waitingList.push(i)
                    }
                    console.log(duration)
                }
                else {
                    for (var id of i.productList) {
                        useDataStore().updateProBook(id, i.promotionPrice, i.promotionEnd)
                        console.log(id)
                        console.log(this.Books.filter(i => i._id === id))
                    }
                }
            }
            // console.log(waitingList)
            if (waitingList.length > 0) {
                var waiting = setInterval(() => {
                    // console.log(waitingList)
                    for (var i of waitingList) {
                        const now = moment();
                        if (now >= new Date(i.promotionBegin) && now <= new Date(i.promotionEnd)) {
                            for (var id of i.productList) {
                                useDataStore().updateProBook(id, i.promotionPrice, i.promotionEnd)
                            }
                            waitingList = waitingList.filter(item => item._id !== i._id)
                        }
                        if (waitingList.length === 0) {
                            clearInterval(waiting)
                        }
                    }
                }, 1000)
            }
        }
    },
    mounted() {
        this.retrieveBook()
    }
}
</script>


<template>
    <header>
        <HeaderVue />
    </header>
    <main v-if="show" class="container py-2">
        <!-- <HomePage /> -->
        <LoginUser />
        <RegisterUser />
        <router-view />
    </main>

    <footer>
        <FooterVue />
    </footer>
</template>

<style scoped>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
} */

/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
