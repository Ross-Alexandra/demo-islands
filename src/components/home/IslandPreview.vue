<template>
    <a 
        class="island-preview"
        :href="islandLink"
        target="_blank"
        rel="noopener noreferrer"
    >
        <iframe
            :src="islandLink"
            :title="props.name"
        />

        <div>
            <h3>{{ props.name }}</h3>
            <p>{{ props.description }}</p>
        </div>
    </a>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
    name: string;
    description: string;
}>();

const islandLink = computed(() => `/static-islands/${props.name}/index.html`);
</script>

<style lang="scss" scoped>
.island-preview {
    display: flex;
    flex-direction: column;
    gap: 10px;

    width: min-content;

    padding: 15px;
    background-color: var(--layer-color);
    border: 1px solid var(--border-color);
    border-radius: 10px;

    text-decoration: none;

    position: relative;
    &::after {
        position: absolute;
        inset: 0px;
        content: '';
    }

    iframe {
        outline: none;
        border: 1px solid var(--border-color);

        width: 500px;
        height: 250px;

        border-radius: 5px;
    }

    h3 {
        font-size: 1.5rem;
        font-weight: 700;
        text-transform: capitalize;
    }

    p {
        font-size: 1rem;
        font-weight: 400;
    }
}
</style>