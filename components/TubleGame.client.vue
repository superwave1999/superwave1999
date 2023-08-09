<script setup lang="ts">
/* eslint-disable import/no-named-as-default-member */
import dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import { Refresh } from "@iconoir/vue";
import TubleBuilder from "assets/js/tuble-builder";
import TubleFunctions from "assets/js/tuble-functions";
import TubleGame from "assets/js/tuble-game";
import equal from "array-equal";

const date = dayjs.extend(utc);
const utcDate = date.utc().format("YYYY-MM-DD") + " 00:00:00";
const layoutSeed = await TubleFunctions.newHash(utcDate);
const modifierSeed = await TubleFunctions.newHash(`${utcDate} MODIFIER`);
const rotationSeed = await TubleFunctions.newHash(`${utcDate} ROTOR`);

const tubleBuilder = new TubleBuilder(
  6,
  layoutSeed,
  modifierSeed,
  rotationSeed
);
tubleBuilder.build();
const vueTubleGame = reactive(new TubleGame(tubleBuilder.getMap()));

const timerStatus = ref("--:--");
let timerProcess: any = null;
watch(vueTubleGame.timeLog, (newValue) => {
  if (newValue.length % 2 !== 0) {
    timerStatus.value = String(vueTubleGame.getTime());
    timerProcess = setInterval(() => {
      timerStatus.value = String(vueTubleGame.getTime());
    }, 1000);
  } else if (timerProcess) {
    clearInterval(timerProcess);
    timerStatus.value = String(vueTubleGame.getTime());
  }
});
console.log('TUBLE LOADED')
</script>

<template>
  <h2 class="title">Tuble</h2>
  <div class="stats">
    <h4>{{ timerStatus }}</h4>
    <h4>{{ vueTubleGame.moves }}</h4>
  </div>
  <table class="map">
    <tr v-for="(xitems, xidx) in vueTubleGame.map" :key="xidx">
      <td v-for="(item, yidx) in xitems" :key="xidx + ',' + yidx">
        <TubleBlock
          :properties="item"
          :is-active-block="equal(vueTubleGame.activeCoords, [item.x, item.y])"
          :is-modifiable="item.isFrontendModifiable()"
          :is-frozen-game="false"
          @select="(e) => vueTubleGame.actionSelectBlock(e)"
        ></TubleBlock>
      </td>
    </tr>
  </table>
  <div class="controls">
    <EffectButton colour="--tuble" @click="vueTubleGame.actionRotate(false)"
      ><Refresh class="mirror"
    /></EffectButton>
    <EffectButton
      colour="--tuble"
      text="VALIDATE"
      @click="vueTubleGame.validate()"
    ></EffectButton>
    <EffectButton colour="--tuble" @click="vueTubleGame.actionRotate(true)"
      ><Refresh
    /></EffectButton>
  </div>
</template>

<style lang="css" scoped>
div.controls,
div.stats {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.mirror {
  transform: scale(-1, 1);
}

table.map {
  margin: 1em auto;
  border-spacing: 0;
}

.title {
  font-size: calc(var(--section-size) - 0.6em);
  text-align: center;
}
</style>
