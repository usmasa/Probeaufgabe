<template>
    <article class="space-x-2 p-2">
        <div class="flex items-start  space-x-2 p-2">
            <img
                    :src="product.imageURL" alt="" width="60" height="88"
                    class="flex-none rounded-md bg-slate-100"/>
            <div class="min-w-0 relative flex-auto">
                <h2 class="font-semibold text-slate-900 truncate pr-20">{{ product.name }}</h2>
                <dl class="flex flex-wrap text-xs leading-6 font-medium">
                    <div>
                        <dt class="sr-only">Price</dt>
                        <dd class="">
                            Price: <span class="text-xs text-slate-500"> {{ product.price.value }} {{product.price.currency}}</span>
                        </dd>
                    </div>
                </dl>
                <dl class="flex flex-wrap">
                    <div>
                        <dt class="text-sky-500">
                            <div class="flex flex-row">
                                <StarRating class="m-0.5"
                                            v-for="n in 5"
                                            :type="product.rating>=n?'filled':'unfilled'"></StarRating>
                            </div>
                        </dt>
                    </div>
                    <div class="absolute right-0 flex items-end space-x-1">
                        <dt class="sr-only">Date</dt>
                        <dd class="px-1.5 ring-1 text-xs ring-slate-200 rounded">{{ new
                            Date(product.releaseDate*1000).toLocaleDateString("en-US") }}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
        <div>
            <p class="text-sm">{{ product.description }}</p>
        </div>
        <div class="mt-4">
            <button @click="onClickWatch"
                    class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {{isWatching?'Forget':'Remember'}}
            </button>
        </div>
        <div class="mt-2">
            <p class="text-sm">{{ product.longDescription }}</p>
        </div>
    </article>
</template>

<script lang="ts" setup>
    import Product from "../models/Product";
    import {ref, onBeforeMount} from 'vue';
    import {useRoute} from "vue-router";
    import StarRating from '../components/StarRating.vue'

    const route = useRoute();
    const product = ref<Product>({
        name: '',
        id: 0,
        imageURL: '',
        available: true,
        releaseDate: 0,
        description: '',
        longDescription: '',
        rating: 0,
        price: {
            value: 0,
            currency: ''
        }
    })
    const watchProductList = ref<Product[]>([]);
    const isWatching = ref<boolean>(false);

    const onClickWatch = () => {
        watchProductList.value.push(product.value);
        if (!isWatching.value) {
            watchProductList.value = [...new Map(watchProductList.value.map(item => [item['id'], item])).values()]
        } else {
            watchProductList.value = watchProductList.value.filter((item) => item.id != product.value.id);
        }
        localStorage.setItem('products', JSON.stringify(watchProductList.value));
        isWatching.value = !isWatching.value;
    }
    onBeforeMount(() => {
        product.value = JSON.parse(atob(<string>route.query.product));
        const products = <string>localStorage.getItem('products') ?? null;
        if (products) {
            watchProductList.value = JSON.parse(products);
            isWatching.value = watchProductList.value.some(item => item.id === product.value.id)
        }

    })
</script>

<style scoped>

</style>