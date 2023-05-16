<script setup lang="ts">
defineProps({
    name: String,
    reverse: {type: Boolean, default: false}
})
</script>
<template>
    <div class="section" :class="{reverse}">
        <div class="title">
            <SectionTitle :name="name" />
        </div>
        <div class="text">
            <slot />
        </div>
    </div>
</template>

<style scoped>
div.section {
    margin-top: var(--btn-height);
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
}

div.section > div.title,
div.section > div.text {
    width: 100%;
}

@media (min-width: 576px) {
    div.section > div.title {
        width: 40%;
    }

    div.section > div.text {
        width: 60%;
    }
}

div.section.reverse {
    flex-direction: row-reverse;
}
</style>