<template>
    <div
        v-if="expanded"
        class="background"
        @click="setExpanded(null)"
    />

    <div class="code-window-tiles">
        <div 
            class="code-tile"
            @click.stop="setExpanded('html')"
        >
            <MarkupIcon />
        </div>
        <div 
            class="code-tile"
            @click.stop="setExpanded('script')"
        >
            <ScriptIcon />
        </div>
        <div 
            class="code-tile"
            @click.stop="setExpanded('styles')"
        >
            <StylesIcon />
        </div>
    </div>

    <div class="code-window" v-if="expanded === 'html'">
        <pre v-if="!htmlContents">Loading...</pre>
        <pre v-highlightjs v-else><code class="html">{{ htmlContents }}</code></pre>
    </div>

    <div class="code-window" v-if="expanded === 'script'">
        <pre v-if="!scriptContents">Loading...</pre>
        <pre v-highlightjs v-else><code class="javascript">{{ scriptContents }}</code></pre>
    </div>

    <div class="code-window" v-if="expanded === 'styles'">
        <pre v-if="!stylesContents">Loading...</pre>
        <pre v-highlightjs v-else><code class="css">{{ stylesContents }}</code></pre>
    </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, computed} from 'vue';
import { useRoute } from 'vue-router';
import { MarkupIcon, StylesIcon, ScriptIcon } from '../icons';
const expanded = ref<'html' | 'script' | 'styles' | null>(null);
function setExpanded(value: 'html' | 'script' | 'styles' | null) {
    expanded.value = value;
}

const route = useRoute();

const scriptContents = ref('');
const stylesContents = ref('');
const htmlContents = ref('');

const islandLink = computed(() => `/static-islands/${route.name?.toString()}/index.html`);
const scriptLink = computed(() => `/static-islands/${route.name?.toString()}/script.js`);
const styleLink = computed(() => `/static-islands/${route.name?.toString()}/styles.css`);

onMounted(() => {
    fetch(islandLink.value)
        .then(res => res.text())
        .then(text => htmlContents.value = text);

    fetch(scriptLink.value)
        .then(res => res.text())
        .then(text => scriptContents.value = text);

    fetch(styleLink.value)
        .then(res => res.text())
        .then(text => stylesContents.value = text);
});
</script>

<style lang="scss" scoped>
.code-window-tiles {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);

    display: flex;
    flex-direction: column;
    gap: 10px;
}

.code-tile {
    width: 40px;
    aspect-ratio: 1;

    display: grid;
    place-items: center;

    background-color: var(--layer-color);
    border: 1px solid var(--border-color);
    border-radius: 0px 10px 10px 0px;

    cursor: pointer;
}

.code-window {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    height: max-content;
    max-height: 80vh;

    min-width: 40vw;
    width: max-content;
    max-width: 80vw;

    overflow-y: auto;

    border-radius: 10px;

    background-color: var(--app-background-color);

    & > pre {
        margin: 0px;
    }
}

.background {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.8);
}
</style>