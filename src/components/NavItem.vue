<template>
    <li class="flex-1 mr-2">
        <router-link
                :to="href"
                :class="['text-center block border rounded py-2 px-4', isActive ?
                ' border-blue-500   bg-blue-500 hover:bg-blue-700 text-white'
                 : 'border-white  hover:border-gray-200 text-blue-500 hover:bg-gray-200']"
        >
            <slot></slot>
        </router-link>
    </li>
</template>

<script setup lang="ts">
    import {defineProps} from "vue";

    defineProps<{
        href: string
        isActive: boolean,
    }>()
</script>