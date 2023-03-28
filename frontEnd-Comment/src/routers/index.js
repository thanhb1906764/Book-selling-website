import { createWebHistory, createRouter } from "vue-router";

// import store from "../store/store"

const routes = [
    {
        path: "/Products",
        name: "Products",
        component: () => import("@/views/Product_Management.vue"),
        // props: true
    },
    {
        path: "/Products/:id",
        name: "ProductForm",
        component: () => import("@/components/Product_Form.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/Products/detail/:id",
        name: "ProductDetail",
        component: () => import("@/views/BookDetails.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    // {
    //     path: "/:pathMatch(.*)*",
    //     name: "notfound",
    //     component: () => import("@/views/NotFound.vue"),
    // },

    {
        path: "/Receipts/new",
        name: "ReceiptNew",
        component: () => import("@/views/Receipt_Create.vue"),
    },
    {
        path: "/Receipts/:id",
        name: "ReceiptEdit",
        component: () => import("@/views/Receipt_Edit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
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
        path: "/Promotion/new",
        name: "PromotionNew",
        component: () => import("@/views/Promotion_Create.vue"),
    },
    {
        path: "/Promotion/:id",
        name: "PromotionEdit",
        component: () => import("@/views/Promotion_Edit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
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
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/Statistical_Sales",
        name: "Statistical_Sales",
        component: () => import("@/views/Statistical.vue"),
    },
    {
        path: "/AdminLogin",
        name: "LoginAdmin",
        component: () => import("@/views/LoginAdmin.vue"),
    },


];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// Xử lý truy cập trái phép - Chưa đăng nhập 
router.beforeEach(async (to, from, next) => {
    const id = to.params.id;
    // const publicPagesUser = ['/acc'];
    const PagesAdmin = ['/', "/Receipts", '/Receipts/new', '/Receipts/:id', "/Orders", "/Promotion", '/Promotion/new', '/Promotion/:id', "/Catalog", "/Clients", "/Products", 'Products/:id', '/LoginAdmin']
    // const authRequiredUser = publicPagesUser.includes(to.path);
    const authRequiredAdmin = PagesAdmin.includes(to.path);

    // if (authRequiredUser && !localStorage.getItem('user')) {
    //     // redirect the user to the login page
    //     next('/UserLogin');
    // }
    if ((authRequiredAdmin) && (!localStorage.getItem('admin'))) {
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
