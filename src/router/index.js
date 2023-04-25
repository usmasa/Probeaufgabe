import {
    createRouter,
    createWebHistory,
} from "vue-router"
import Products from "../pages/Products.vue";
import ProductDetails from "../pages/ProductDetails.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "products",
            component: Products
        },
        {
            path: "/available-products",
            name: "available-products",
            component: Products
        },
        {
            path: "/watch-products",
            name: "watch-products",
            component: Products
        },
        {
            path: "/product-details",
            name: "product-details",
            component: ProductDetails
        },
    ]
})

export default router
