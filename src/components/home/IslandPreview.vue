<template>
    <router-link 
        class="island-preview"
        :to="`/${props.name}`"
    >
        <iframe
            :src="islandLink"
            :title="props.name"
        />

        <div>
            <h3>{{ props.name }}</h3>
            <p>{{ props.description }}</p>
        </div>
    </router-link>
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
        z-index: 1;
        inset: -1px; // cover the border on hover
        border-radius: 10px;
        content: '';

        transition: background-color 250ms;
        background-color: rgba(0, 0, 0, 0);
    }

    &:hover::after {
            display: grid;
            place-items: center;
            content: 'Demo Only, Click to View';

            font-size: 1.5rem;
            font-weight: 700;
            font-family: 'Poppins', sans-serif;
            color: var(--text-color);
            background-color: rgba(0, 0, 0, 0.5);
        }

    iframe {
        outline: none;
        border: none;

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