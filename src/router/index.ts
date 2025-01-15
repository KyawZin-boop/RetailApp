import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../modules/Home/HomeView.vue";
import ProductView from "../modules/product/ProductView.vue";
import RecordView from "@/modules/SaleRecord/RecordView.vue";
import CartView from "@/modules/Cart/CartView.vue";

const routes = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/products",
            name: "products",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: ProductView,
        },
        {
            path: "/records",
            name: "records",
            component: RecordView,
        },
        {
            path: "/cart",
            name: "cart",
            component: CartView,
        }
    ],
})

export default routes