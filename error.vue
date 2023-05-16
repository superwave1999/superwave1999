<script setup>
import {ArrowLeft} from "@iconoir/vue";
defineProps(['error'])
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <div class="fade-in">
        <ErrorCode :code="error.statusCode" />
        <br />
        <h2>Error inesperado</h2>
        <ButtonRow>
            <EffectButton @click="handleError" :text="'return home'" colour="--error" ><ArrowLeft /></EffectButton>
        </ButtonRow>
    </div>
</template>

<style scoped>
h2 {
    text-align: center;
}

div.fade-in {
    animation: fade-in 4s;
    animation-iteration-count: 1;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>