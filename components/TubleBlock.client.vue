<script setup lang="ts">
import { SingleTapGesture, Timer } from "@iconoir/vue";
import equal from "array-equal";
import TubleBlock from "assets/js/tuble-block";

const emit = defineEmits(["select"]);
const props = defineProps({
  properties: { type: Object, required: true },
  isActiveBlock: { type: Boolean, required: true },
  isModifiable: { type: Boolean, required: true },
  isFrozenGame: { type: Boolean, required: true },
});
const properties = props.properties as TubleBlock;
const typeIcons: { [index: string]: any } = {
  a: { icon: Timer, colour: "#518229" }, // Time benefit
  b: { icon: SingleTapGesture, colour: "#518229" }, // Moves benefit
  x: { icon: Timer, colour: "#b31552" }, // Time penalty
  z: { icon: SingleTapGesture, colour: "#b31552" }, // Moves penalty
};

const isCurved = computed(() => {
  if (properties.connections.includes(-1)) {
    return false;
  }
  const diff = Math.abs(properties.connections[0] - properties.connections[1]);
  return Boolean(diff % 2);
});

const imageType = computed(() => {
  let type;
  if (properties.connections.includes(-1)) {
    type = "end";
  } else if (isCurved.value) {
    type = "curve";
  } else {
    type = "straight";
  }
  return type;
});

const rotation = computed(() => {
  let rot = "rotate(0deg)";
  if (properties.connections.includes(-1)) {
    const max = Math.max(...properties.connections);
    rot = `rotate(${max * 90}deg)`;
  } else if (!isCurved.value) {
    if ((properties.connections[0] || 0) % 2 === 1) {
      rot = "rotate(90deg)";
    }
  } else {
    const sort = properties.connections.slice();
    sort.sort();
    let sum;
    if (equal(sort, [0, 3])) {
      sum = Math.max(...properties.connections);
    } else {
      sum = Math.min(...properties.connections);
    }
    rot = `rotate(${sum * 90}deg)`;
  }
  return `${rot}`;
});

const overlayIcon = computed(() => {
  return typeIcons[properties.type]?.icon || "";
});

const overlayColour = computed(() => {
  return typeIcons[properties.type]?.colour || "";
});

function setActiveBlock() {
  if (properties.isFrontendModifiable()) {
    emit("select", [properties.x, properties.y]);
  }
}
</script>

<template>
  <div
    class="block"
    :class="{
      click: props.isModifiable,
      noclick: !props.isModifiable,
      active: props.isActiveBlock,
      frozen: props.isFrozenGame,
    }"
    @click="setActiveBlock"
  >
    <svg v-if="imageType === 'end'" viewBox="0 0 512 512">
      <path fill="#4fc3f7" d="M194.205 28.962V236.72h123.586V28.962z" />
      <path
        fill="#8d6e63"
        d="M353.104 0v18.962a10 10 0 0 1-10.002 10.002H168.898a10.01 10.01 0 0 1-10.002-10.002V0"
      />
      <path
        fill="#ff3d00"
        d="M370.759 332.902c0 63.382-51.377 114.759-114.759 114.759s-114.758-51.377-114.758-114.759 51.377-114.759 114.759-114.759 114.758 51.377 114.758 114.759"
      />
      <path
        fill="#d84315"
        d="M344.276 332.902c0 48.75-39.525 88.276-88.276 88.276s-88.275-39.526-88.275-88.276 39.525-88.276 88.276-88.276 88.275 39.526 88.275 88.276"
      />
      <path
        fill="#6d4c41"
        d="M256 315.247c-9.737 0-17.655 7.918-17.655 17.655s7.918 17.655 17.655 17.655 17.655-7.918 17.655-17.655-7.918-17.655-17.655-17.655m0 52.965c-19.474 0-35.31-15.837-35.31-35.31s15.837-35.31 35.31-35.31 35.31 15.837 35.31 35.31-15.836 35.31-35.31 35.31"
      />
      <path
        fill="#ff3d00"
        d="M256 244.281c-2.993 0-5.932.419-8.828.781v87.357c0 4.873 4.666 8.828 8.828 8.828s8.828-3.955 8.828-8.828v-87.357c-2.896-.362-5.835-.781-8.828-.781"
      />
    </svg>
    <svg
      v-if="imageType === 'curve'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.002 512.002"
    >
      <path
        fill="#8d6e63"
        d="M512.002 353.105H493.04a10 10 0 0 1-10.002-10.002V168.899a10.01 10.01 0 0 1 10.002-10.002h18.962M353.105 0v18.962a10 10 0 0 1-10.002 10.002H168.899a10.01 10.01 0 0 1-10.002-10.002V0"
      />
      <path
        fill="#4fc3f7"
        d="M194.207 28.965v165.224h147.588c-24.01.004-24 .002-24-23.509V28.965zm.002 165.226c0 68.246 55.328 123.572 123.58 123.576h165.248V194.19H317.789z"
      />
    </svg>
    <svg
      v-if="imageType === 'straight'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path fill="#4fc3f7" d="M317.791 483.033V28.959H194.205v454.074z" />
      <path
        fill="#8d6e63"
        d="M158.896 511.998v-18.962a10 10 0 0 1 10.002-10.002h174.204a10.01 10.01 0 0 1 10.002 10.002v18.962m0-511.998v18.962a10 10 0 0 1-10.002 10.002H168.898a10.01 10.01 0 0 1-10.002-10.002V0"
      />
    </svg>
    <div v-if="overlayIcon" class="icon">
      <component :is="overlayIcon"></component>
    </div>
  </div>
</template>

<style scoped>
div.block {
  aspect-ratio: 1 / 1;
  display: flex;
  position: relative;
  width: var(--tuble-block-width);
}

div.block > svg {
  transform: v-bind(rotation);
  position: absolute;
  z-index: 1;
  object-fit: contain;
}

div.block > div.icon {
  z-index: 2;
  background-color: v-bind(overlayColour);
  border-radius: 50%;
  display: flex;
  font-size: 2rem;
  padding: 0.1rem;
  width: 2.1rem;
  max-height: 2.1rem;
  align-self: center;
  margin: 0 auto;
}

div.block.click {
  cursor: pointer;
}

div.block.click:hover {
  background-color: #00695c2f !important; /* teal darken-3 */
}

div.block.noclick {
  cursor: not-allowed;
}

div.block.noclick:hover {
  background-color: #c628282f !important; /* red lighten-1 */
}

div.block.active,
div.block.active:hover {
  cursor: default;
  background-color: #00695c !important; /* teal darken-3 */
}

div.block.active.noclick,
div.block.active.noclick:hover {
  cursor: not-allowed;
  background-color: #c62828bb !important; /* red lighten-1 */
}

div.block.frozen:not(.active) {
  /* Override everything */
  pointer-events: none !important;
  cursor: default !important;
  opacity: 0.7 !important;
  background-color: transparent !important;
}
</style>
