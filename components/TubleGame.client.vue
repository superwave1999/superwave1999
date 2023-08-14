<script setup lang="ts">
/* eslint-disable import/no-named-as-default-member */
import { useModal } from "vue-final-modal";
import dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import { Refresh, SingleTapGesture, Timer } from "@iconoir/vue";
import TubleGame from "assets/js/tuble-game";
import TubleValidator from "assets/js/tuble-validator";
import equal from "array-equal";
import ModalAlert from "@/components/ModalAlert.vue";
import ModalTubleComplete from "@/components/ModalTubleComplete.vue";
const { t } = useI18n();

const date = dayjs.extend(utc);
const utcDate = date.utc().format("YYYY-MM-DD") + " 00:00:00";

const tubleGame = new TubleGame(utcDate);
await tubleGame.build();
const vueTubleGame = reactive(tubleGame);

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

async function validate() {
  const validator = vueTubleGame.validate();
  if (validator !== false) {
    vueTubleGame.finish();
    const { open, close } = useModal({
      component: ModalTubleComplete,
      attrs: {
        title: t("tuble.modal.successTitle"),
        stats: validator as TubleValidator,
        onConfirm() {
          close();
        },
      },
    });
    await open();
  } else {
    const { open, close } = useModal({
      component: ModalAlert,
      attrs: {
        title: t("tuble.modal.failTitle"),
        onConfirm() {
          close();
        },
        onClosed() {
          vueTubleGame.addMove();
          vueTubleGame.startTime();
        },
      },
      slots: {
        default: `<p>${t("tuble.modal.failText")}</p>`,
      },
    });
    await open();
  }
}
</script>

<template>
  <h2 class="title">{{ $t("p_index.btnTuble") }}</h2>
  <div class="stats">
    <h4><Timer />&nbsp;{{ timerStatus }}</h4>
    <h4><SingleTapGesture />&nbsp;{{ vueTubleGame.moves }}</h4>
  </div>
  <p v-if="vueTubleGame.isFrozen" class="next">
    Return tomorrow for a new challenge!
  </p>
  <table class="map">
    <tr v-for="(xitems, xidx) in vueTubleGame.map" :key="xidx">
      <td v-for="(item, yidx) in xitems" :key="xidx + ',' + yidx">
        <TubleBlock
          :properties="item"
          :is-active-block="
            !vueTubleGame.isFrozen &&
            equal(vueTubleGame.activeCoords, [item.x, item.y])
          "
          :is-modifiable="item.isFrontendModifiable()"
          :is-frozen-game="vueTubleGame.isFrozen"
          @select="(e) => vueTubleGame.actionSelectBlock(e)"
        ></TubleBlock>
      </td>
    </tr>
  </table>
  <div class="controls">
    <EffectButton
      colour="--tuble"
      :disabled="vueTubleGame.isFrozen"
      @click="vueTubleGame.actionRotate(false)"
      ><Refresh class="mirror"
    /></EffectButton>
    <EffectButton
      colour="--tuble"
      :text="$t('tuble.hud.submit')"
      :disabled="vueTubleGame.isFrozen"
      @click="validate"
    ></EffectButton>
    <EffectButton
      colour="--tuble"
      :disabled="vueTubleGame.isFrozen"
      @click="vueTubleGame.actionRotate(true)"
      ><Refresh
    /></EffectButton>
  </div>
</template>

<style scoped>
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

p.next {
  text-align: center;
}
</style>
