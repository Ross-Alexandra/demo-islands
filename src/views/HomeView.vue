<template>
    <div class="islands">
        <IslandPreview
            v-for="island in publicIslands"
            :key="island.name"
            :name="island.name"
            :description="island.description"
        />
    </div>
</template>

<script lang="ts" setup>
import IslandPreview from '@/components/home/IslandPreview.vue';
import { publicIslands } from '@/publicIslands';
</script>

<style lang="scss" scoped>
@import '@/global.scss';

.islands {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    place-items: center;

    margin-top: 15px;
    gap: 15px;

    @media (max-width: $desktop-breakpoint) {
        display: flex;
        flex-direction: column;
    }
}
</style>
