<template>
  <div class="effect">
    <div class="e1" />
    <div class="e2" />
    <div class="e3" />
  </div>
</template>

<style scoped>
div.effect {
  position: absolute;
  height: var(--effect-height);
  width: 100%;
  z-index: -1;
  filter: blur(var(--effect-blur));
  overflow: hidden;
  opacity: var(--effect-opacity);
}

div.effect > * {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 60ch;
  transform: translate(50%, -50%);
  animation-direction: normal;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  transition: background-color 4s ease-in-out;
}

div.e1 {
  background-color: var(--effect-1);
  animation-duration: var(--effect-1-timing), var(--effect-1-timing);
  animation-name: animbase, anim1;
}

div.e2 {
  background-color: var(--effect-2);
  animation-duration: var(--effect-2-timing), var(--effect-2-timing);
  animation-name: animbase, anim2;
}

div.e3 {
  background-color: var(--effect-3);
  animation-duration: var(--effect-3-timing), var(--effect-3-timing);
  animation-name: animbase, anim3;
}

@keyframes animbase {
  0% {
    top: 0;
    right: -75%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  66% {
    opacity: 1;
  }
  100% {
    top: -50%;
    right: 90%;
    opacity: 0;
  }
}

@keyframes anim1 {
  0% {
    width: calc(78ch * var(--effect-size-mul));
    height: calc(47ch * var(--effect-size-mul));
  }
  20% {
    width: calc(101ch * var(--effect-size-mul));
    height: calc(118ch * var(--effect-size-mul));
  }
  100% {
    width: calc(61ch * var(--effect-size-mul));
    height: calc(130ch * var(--effect-size-mul));
  }
}

@keyframes anim2 {
  0% {
    width: calc(120ch * var(--effect-size-mul));
    height: calc(98ch * var(--effect-size-mul));
  }
  50% {
    width: calc(42ch * var(--effect-size-mul));
    height: calc(64ch * var(--effect-size-mul));
  }
  100% {
    width: calc(100ch * var(--effect-size-mul));
    height: calc(40ch * var(--effect-size-mul));
  }
}

@keyframes anim3 {
  0% {
    width: calc(100ch * var(--effect-size-mul));
    height: calc(100ch * var(--effect-size-mul));
  }
  30% {
    width: calc(120ch * var(--effect-size-mul));
    height: calc(75ch * var(--effect-size-mul));
  }
  100% {
    width: calc(70ch * var(--effect-size-mul));
    height: calc(62ch * var(--effect-size-mul));
  }
}
</style>
