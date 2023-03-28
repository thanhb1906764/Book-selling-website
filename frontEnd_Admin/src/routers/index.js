import { createWebHistory, createRouter } from "vue-router";
import { useDataStore } from '../stores/dataStores';
// import AccountVue from "@/components/Account.vue";
import AccountVue from "../views/Account.vue";
import InfoVue from "@/components/Info.vue";
import AddressAccVue from "@/components/AddressAcc.vue";
import OrderVue from "@/components/Order.vue";
import NewAddress from "@/components/NewAddress.vue"
import OrderDetailVue from "@/components/OrderDetail.vue";
import AddressEditVue from "@/components/AddressEdit.vue";
// import store from "../store/store"

const routes = [
    // kiz
    {
        path: "/",
        name: "HomePage",
        component: () => import("@/views/HomePage.vue"),
        // props: true
    },
    {
        path: "/Cart",
        name: "Cart",
        component: () => import("@/views/Cart.vue"),
        // props: true
    },
    {
        path: "/Pay",
        name: "Pay",
        component: () => import("@/views/Pay.vue"),
        // props: true
    },
    {
        path: "/AdminLogin",
        name: "LoginAdmin",
        component: () => import("@/views/LoginAdmin.vue"),
        // props: true
    },
    {
        path: "/Test",
        name: "Test",
        component: () => import("@/views/Test.vue"),
        // props: true
    },
    {
        path: "/UserLogin",
        name: "LoginUser",
        component: () => import("@/views/LoginUserPage.vue"),
        // props: true
    },
    {
        path: "/UserRegister",
        name: "RegisterUser",
        component: () => import("@/views/RegisterUserPage.vue"),
        // props: true
    },
    {
        path: "/Products/:id",
        name: "BookDetails",
        component: () => import("@/views/BookDetails.vue"),
        props: true // props id products
    },


    // Phu
    {
        path: '/acc',
        component: AccountVue,
        children: [
            { path: "info", component: InfoVue },
            { path: "address", component: AddressAccVue },
            { path: "order", component: OrderVue },
            { path: "address/add", component: NewAddress },
            { path: "address/edit/:id", name: "AddressEditVue", component: AddressEditVue },
            { path: "order/:id", name: "OrderDetail", component: OrderDetailVue, },

        ]
    },
    {
        path: "/category",
        name: "category",
        component: () => import("../components/CategoryView.vue"),
    },


    // Thanh
    {
        path: "/Products",
        name: "Products",
        component: () => import("@/views/Product_Management.vue"),
        // props: true
    },
    // {
    //     path: "/:pathMatch(.*)*",
    //     name: "notfound",
    //     component: () => import("@/views/NotFound.vue"),
    // },
    // {
    //     path: "/Diary/:id",
    //     name: "diary.edit",
    //     component: () => import("@/views/DiaryEdit.vue"),
    //     props: true // Truyền các biến trong $route.params vào làm props
    // },
    {
        path: "/Clients",
        name: "Clients",
        component: () => import("@/views/Clients_Management.vue"),
    },
    {
        path: "/Catalog",
        name: "Catalog",
        component: () => import("@/views/Catalog_Management.vue"),
    },
    {
        path: "/Promotion",
        name: "Promotion",
        component: () => import("@/views/Promotion_Managemnet.vue"),
    },
    {
        path: "/Orders",
        name: "Orders",
        component: () => import("@/views/Order_Management.vue"),
    },
    {
        path: "/Receipts",
        name: "Receipts",
        component: () => import("@/views/Receipt_Management.vue"),
    },

];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// Xử lý truy cập trái phép - Chưa đăng nhập 
router.beforeEach(async (to, from, next) => {
    const id = to.params.id;
    const publicPagesUser = ['/acc'];
    const PagesAdmin = ["/Receipts", "/Orders", "/Promotion", "/Catalog", "/Clients", "/Products"]
    const authRequiredUser = publicPagesUser.includes(to.path);
    const authRequiredAdmin = PagesAdmin.includes(to.path);

    if (authRequiredUser && !localStorage.getItem('user')) {
        // redirect the user to the login page
        next('/UserLogin');
    } else if ((authRequiredAdmin) && (!localStorage.getItem('admin'))) {
        // redirect the user to the login page
        next('/AdminLogin')
    }
    else {
        // Không làm gì 
        next();
    }
})


// router.beforeEach((to, from) => {
//     const authenticated=store.state.isAuthenticated
//     if ((to.name === 'Home' || to.name === 'diary.edit' || to.name === 'diary.create' || to.name === 'changeName' || to.name === 'changePass' || to.name === 'deleteAcc' )&& authenticated===false) {
//         router.push('/Diary/Login')
//     }
// })
export default router;
