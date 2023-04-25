<template>
    <div class="divide-y divide-slate-100">
        <Nav>
            <NavItem href="/" :isActive="currentRoute=='products'">All</NavItem>
            <NavItem href="/available-products" :isActive="currentRoute=='available-products'">Available</NavItem>
            <NavItem href="/watch-products" :isActive="currentRoute=='watch-products'">Watch</NavItem>
        </Nav>
        <List>
            <ListItem
                    @click="onClickProduct(product)"
                    v-for="product in products" :key="product.id" :product="product"/>
        </List>
    </div>
</template>

<script setup lang="ts">
    import Nav from '../components/Nav.vue'
    import NavItem from '../components/NavItem.vue'
    import List from '../components/List.vue'
    import ListItem from '../components/ListItem.vue'
    import {ref, onBeforeMount, computed, watch} from 'vue';
    import axios from 'axios';
    import Product from "../models/Product";
    import {useRoute, useRouter} from 'vue-router';

    const route = useRoute();
    const router = useRouter();
    const products = ref<Product[]>([])
    const url = 'https://gist.githubusercontent.com/benfranke/c33280a8df5f4f9db2e63ad45cab26a4/raw/f3ad6c00ff520c2667305103d5705bcbb57a7778/products.json';

    const fetchProducts = async () => {
        axios.get(url).then(response => {
            products.value = response.data.products;
            if (route.name == 'available-products') {
                products.value = products.value.filter((product: Product) => product.available)
            }
        })
    }

    const currentRoute = computed(() => {
        return route.name;
    });
    const onClickProduct = (product: Product) => {
        router.push({name: 'product-details', query: {product: btoa(JSON.stringify(product))}})
    }
    watch(() => route.name, (newVal: string, oldVal) => {
        prepareProducts(newVal)
    });
    const prepareProducts = (type: string) => {
        if (type == 'watch-products') {
            const watchProducts = <string>localStorage.getItem('products') ?? null;
            if (watchProducts) {
                products.value = JSON.parse(watchProducts);
            } else {
                products.value = [];
            }
        } else {
            fetchProducts()
        }
    }
    onBeforeMount(async () => {
        prepareProducts(route.name as string)
    })
</script>
