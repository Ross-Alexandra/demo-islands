<template>
    <iframe
        class="island"
        :src="islandLink"
    />

    <CodeWindows />
</template>

<script lang="ts" setup>
import CodeWindows from '@/components/island/CodeWindows.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const islandLink = computed(() => `/static-islands/${route.name?.toString()}/index.html`);
</script>

<style lang="scss" scoped>
@import '@/global.scss';

.island {
    width: calc(100% - 100px);
    height: 100%;
    border: none;

    margin-left: 50px;

    @media (max-width: $tablet-breakpoint) {
        height: calc(100% - 50px);
        width: 100%;
        margin-left: 0;
        margin-top: 35px; // +15px padding = 50px
    }
}
</style>