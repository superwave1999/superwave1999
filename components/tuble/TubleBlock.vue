<script setup lang="ts">
import TubleBlock from "assets/js/tuble-block";
import { SingleTapGesture, Timer } from "@iconoir/vue";
import equal from "array-equal";

const emit = defineEmits(["select"]);
const props = defineProps(["properties"]);
const properties: TubleBlock = props.properties;
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
  } else if (isCurved) {
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
  } else if (!isCurved) {
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

const isActiveBlock = computed(() => {
  return true; //TODO: This.
});

const isModifiable = computed(() => {
  return true; //TODO: This.
});

const isFrozenGame = computed(() => {
  return false; //TODO: This.
});

const coords = [0, 1, 2, 3];

const setActiveBlock = () => {
  emit("select", [properties.x, properties.y]);
};
</script>

<template>
  <div
    class="block"
    :class="{
      click: isModifiable,
      noclick: !isModifiable,
      active: isActiveBlock,
      frozen: isFrozenGame,
    }"
    @click="setActiveBlock"
  >
    <img :src="baseImage" />
    <div v-if="overlayIcon" class="icon">
      <component :is="overlayIcon"></component>
    </div>
  </div>
</template>

<style scoped lang="css">
div.block {
  aspect-ratio: 1 / 1;
  display: flex;
  position: relative;
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
</style>
