<script setup lang="ts">
import { Refresh, Check } from "@iconoir/vue";
import TubleGame from "assets/js/tuble-game";
import TubleFunctions from "assets/js/tuble-functions";

const date = new Date();
const utcDate = `${date.getUTCFullYear()}-${
  date.getUTCMonth() + 1
}-${date.getUTCDate()} 00:00:00`;
const layoutSeed = await TubleFunctions.newHash(utcDate);
const modifierSeed = await TubleFunctions.newHash(`${utcDate} MODIFIER`);
const rotationSeed = await TubleFunctions.newHash(`${utcDate} ROTOR`);

const tubleGame = new TubleGame(6, layoutSeed, modifierSeed, rotationSeed);
tubleGame.build();

const vueTubleGame = reactive(tubleGame);
</script>

<template>
  <section class="game-container">
    <div class="stats">
      <h5>Tuble</h5>
      <p>00:00</p>
      <p>00:00</p>
    </div>

    <table class="map">
      <tr v-for="(xitems, xidx) in vueTubleGame.gameMap" :key="xidx">
        <td v-for="(item, yidx) in xitems" :key="xidx + ',' + yidx">
          <TubleBlock
            :properties="item"
            @select="console.log('BLOCK SELECTED')"
          ></TubleBlock>
        </td>
      </tr>
    </table>

    <div class="controls">
      <EffectButton @click="console.log('L')" colour="--tuble"
        ><Refresh class="mirror"
      /></EffectButton>
      <EffectButton
        @click="console.log('VALIDATE')"
        colour="--tuble"
        text="VALIDATE"
        ><Check
      /></EffectButton>
      <EffectButton @click="console.log('R')" colour="--tuble"
        ><Refresh
      /></EffectButton>
    </div>
  </section>
</template>

<style lang="css" scoped>
section.game-container {
  max-width: 52ch;
  margin: -12ch auto 0;
}

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
  width: 100%;
  margin-top: 1em;
  margin-bottom: 1em;
  border-spacing: 0;
}
</style>
