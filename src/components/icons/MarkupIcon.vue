<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="props.size" :height="props.size" viewBox="0 0 24 24">
        <path
            d="M24 10.935v2.131l-8 3.947v-2.23l5.64-2.783-5.64-2.79v-2.223l8 3.948zm-16 3.848l-5.64-2.783 5.64-2.79v-2.223l-8 3.948v2.131l8 3.947v-2.23zm7.047-10.783h-2.078l-4.011 16h2.073l4.016-16z"
            :fill="props.color"    
        />
    </svg>
</template>

<script lang='ts' setup>
const props = withDefaults(defineProps<{
    size?: number | string;
    color?: string;
}>(), {
    size: 24,
    color: 'white',
});
</script>