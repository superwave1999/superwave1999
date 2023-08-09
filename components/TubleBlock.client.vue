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

const baseImage = computed(() => {
  let suffix;
  if (properties.connections.includes(-1)) {
    suffix = "h";
  } else if (isCurved.value) {
    suffix = "c";
  } else {
    suffix = "s";
  }
  return "/tuble/block_" + suffix + ".svg";
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

const setActiveBlock = () => {
  if (properties.isFrontendModifiable()) {
    emit("select", [properties.x, properties.y]);
  }
};
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
    <img :src="baseImage" />
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

div.block > img {
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
