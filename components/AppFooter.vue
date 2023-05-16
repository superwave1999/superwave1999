<script setup lang="ts">
import { toRoman } from "roman-numerals";

const year = toRoman(new Date().getFullYear());
</script>

<template>
  <div class="footer">
    <h3>Imanol Romera</h3>
    <div class="grid">
      <p>PHP</p>
      <p>Vue</p>
      <p>Java</p>
      <p>Node.js</p>
      <p>Angular</p>
      <p>Go</p>
    </div>
    <div class="grid">
      <p>© {{ year }}</p>
    </div>
  </div>
</template>

<style scoped>
div.footer {
  margin-top: 10ch;
  margin-bottom: 5ch;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

div.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

h3 {
  text-align: right;
}

div.grid > p {
  margin: var(--main-margin);
  margin-left: calc(var(--main-margin) * 2);
  margin-right: 0;
  font-size: 0.8em;
  opacity: 0.6;
}
</style>
