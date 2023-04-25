<template>
    <article class="flex items-start space-x-6 p-6" v-if="product">
        <img v-if="product.available"
             :src="product.imageURL" alt="" width="60" height="88"
             class="flex-none rounded-md bg-slate-100"/>
        <div class="min-w-0 relative flex-auto">
            <h2 class="font-semibold text-slate-900 truncate pr-10">{{ product.name }}</h2>
            <p class="text-xs">{{ product.description }}</p>
            <dl class="mt-2 flex flex-wrap text-xs leading-6 font-medium">
                <div class="absolute top-0 right-0 flex items-end space-x-1">
                    <dt class="sr-only">Date</dt>
                    <dd class="px-1.5 ring-1 text-xs ring-slate-200 rounded">{{ new
                        Date(product.releaseDate*1000).toLocaleDateString("en-US") }}
                    </dd>
                </div>
                <div>
                    <dt class="sr-only">Price</dt>
                    <dd class="">
                        Price: <span class="text-xs text-slate-500"> {{ product.price.value }} {{product.price.currency}}</span>
                    </dd>
                </div>
                <div>
                    <dt class="text-sky-500">
                        <div class="flex flex-row">
                            <StarRating class="m-0.5"
                                        v-for="n in rating"
                                        type="filled"></StarRating>
                            <StarRating class="m-0.5"
                                        v-if="5-rating>0"
                                        type="half"></StarRating>

                            <StarRating class="m-0.5"
                                        v-if="rating<5"
                                        v-for="n in 5-rating-1"
                                        type="unfilled"></StarRating>
                        </div>
                    </dt>
                </div>

            </dl>
        </div>
        <img v-if="!product.available" :src="product.imageURL" alt="" width="60" height="88"
             class="flex-none rounded-md bg-slate-100"/>
    </article>
</template>

<script setup lang="ts">
    import {defineProps, computed} from 'vue';
    import Product from "../models/Product";
    import StarRating from '../components/StarRating.vue'

    const props = defineProps<{
        product: Product
    }>()
    const rating = computed(() => {
        return parseInt(String(Math.round(props.product.rating)));
    })
</script>