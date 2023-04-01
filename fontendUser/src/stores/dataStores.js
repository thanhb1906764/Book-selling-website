import { defineStore } from 'pinia'
export const useDataStore = defineStore('data', {
    state: () => ({
        Books: [],
        Images: [],
        admin: [],
        address: [],
        user: [],
        snackbar: false,
        genreSelected: [],
        Genes: [],
        promotionList: [],
        clientList: [],
        supplierList: [],
        orderConfirmation: [],
        orderList: [],
        receiptList: [],
        tagList: [],
    }),
    getters: {
        getImages: state => state.Images,
        getUser: state => state.user,
        getAdmin: state => state.admin,
        getBooks: state => state.Books,
        getGenes: state => state.Genes,
        getPromotionList: state => state.promotionList,
        getClientList: state => state.clientList,
        getOrderConfirmation: state => state.orderConfirmation,
        getOrderList: state => state.orderList,
        getReceiptList: state => state.receiptList,
        getTagList: state => state.tagList,
        getAddress: state => state.address,
        getGenreSelected: state => state.genreSelected,
        getSnackbar: state => state.snackbar,
    },
    actions: {
        setBooks(data) {
            this.$patch((state) => {
                state.Books = data;
            })
        },
        setImages(data) {
            this.$patch((state) => {
                state.Images = data;
            })
        },
        setAdmin(data) {
            this.$patch((state) => {
                state.admin = data;
            })
        },
        setUser(data) {
            this.$patch((state) => {
                state.user = data;
            })
        },
        updateBook(id) {
            this.$patch((state) => {
                for (var book of state.Books) {
                    if (id === book._id) {
                        book.bookPrice = book.originalPrice
                        book.promotionTime = null
                        break;
                    }
                }
            })
        },
        updateProBook(id, price, time) {
            this.$patch((state) => {
                for (var book of state.Books) {
                    if (id === book._id) {
                        book.bookPrice = book.bookPrice - (book.originalPrice * price / 100);
                        book.promotionTime = time
                        break;
                    }
                }
            })
        },
        getAPIGenes(data) {
            this.$patch((state) => {
                state.Genes = data
            })
        },
        setGenreSelected(data) {
            this.$patch((state) => {
                state.genreSelected = data
            })
        },
        getAPIOrder(data) {
            this.$patch((state) => {
                state.orderList = data
            })
        },
        getAPIAddress(data) {
            this.$patch((state) => {
                state.address = data
            })
        },
        setSnackbar(data) {
            this.$patch((state) => {
                state.snackbar = data
            })
        },
    }
})
