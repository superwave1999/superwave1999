<script setup lang="ts">
const props = defineProps({
    colour: {type: String, default: '--accent'},
    name: String,
})

const cssVarColour = computed(() => {
    return `var(${props.colour})`;
});

</script>

<template>
    <h3 class="sectitle">
        <span>[</span>{{name}}<span>]</span>
    </h3>
</template>

<style scoped>
.sectitle {
    font-size: var(--section-size);
    text-transform: lowercase;
    margin-bottom: var(--main-margin);
    margin-top: var(--main-margin);
}

.sectitle span {
    color: v-bind(cssVarColour);
}
</style>
