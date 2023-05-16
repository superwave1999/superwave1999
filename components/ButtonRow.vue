<template>
    <div class="row">
        <slot />
    </div>
</template>

<style>
div.row {
    margin-top: var(--btn-height);
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
}

div.row > * {
    margin: var(--main-margin)
}
</style>
