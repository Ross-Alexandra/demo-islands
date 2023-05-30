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
.island {
    width: calc(100% - 100px);
    height: 100%;
    border: none;

    margin-left: 50px;
}
</style>