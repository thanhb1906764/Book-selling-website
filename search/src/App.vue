<script >
import HomePage from './views/HomePage.vue';
import HeaderVue from './components/Header.vue';
import FooterVue from './components/Footer.vue';
import { useDataStore } from './stores/dataStores';
import BooksService from '@/services/books.service';
import PromotionsService from '@/services/promotions.service';
import ImagesService from '@/services/images.service'
// model - Hiển thị đăng nhập, đăng ký mà không cần chuyển trang 
import LoginUser from './components/LoginUser.vue';
import RegisterUser from './components/RegisterUser.vue';
import moment from 'moment';

export default {
    components: {
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
                //Lấy ảnh
                var Images = await ImagesService.getAll();
                useDataStore().setImages(Images)
                this.Books = await BooksService.getAll();
                this.Books = await this.Books.filter(itemBook => itemBook.author !== undefined)
                await useDataStore().setBooks(this.Books)



                console.log(this.Books)
                await this.checkPromotion()
                this.show = true
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
<template >
    <header v-if="show">
        <HeaderVue />
    </header>
    <main v-if="show">
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
main {
    background-color: #f0f2f5;
    padding: 16px 0;
}
</style>
