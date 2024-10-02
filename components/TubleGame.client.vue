<script setup lang="ts">
import { useModal } from "vue-final-modal";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  PhHandTap,
  PhTimer,
  PhQuestion,
  PhArrowClockwise,
  PhArrowCounterClockwise,
} from "@phosphor-icons/vue";
import equal from "array-equal";
import TubleGame from "assets/js/tuble-game";
import type TubleValidator from "assets/js/tuble-validator";
import ModalAlert from "@/components/ModalAlert.vue";
import ModalTubleComplete from "@/components/ModalTubleComplete.vue";
import ModalTubleHelp from "@/components/ModalTubleHelp.vue";
const { t } = useI18n();

const date = dayjs.extend(utc);
const utcDate = date.utc().format("YYYY-MM-DD") + " 00:00:00";

const tubleGame = new TubleGame(utcDate);
await tubleGame.build();
const vueTubleGame = reactive(tubleGame);

const timerStatus = ref("--:--");
if (tubleGame.isFrozen) {
  timerStatus.value = String(tubleGame.getTime());
}
let timerProcess: number | null = null;
watch(vueTubleGame.timeLog, (newValue) => {
  if (newValue.length % 2 !== 0) {
    timerStatus.value = String(vueTubleGame.getTime());
    timerProcess = window.setInterval(() => {
      timerStatus.value = String(vueTubleGame.getTime());
    }, 1000);
  } else if (timerProcess) {
    window.clearInterval(timerProcess);
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

async function openHelp() {
  const playing = vueTubleGame.timeLog.length > 0 && !vueTubleGame.isFrozen;
  const { open, close } = useModal({
    component: ModalTubleHelp,
    attrs: {
      onConfirm() {
        close();
        if (playing) {
          vueTubleGame.startTime();
        }
      },
    },
  });
  if (playing) {
    vueTubleGame.stopTime();
  }
  await open();
}

function keyboardListener(event: KeyboardEvent) {
  event.preventDefault();
  if (vueTubleGame.isFrozen) {
    return false;
  }
  const arrowKeys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
  if (arrowKeys.includes(event.key)) {
    const topCoords = vueTubleGame.map.length;
    let coords: [number, number] = vueTubleGame.activeCoords;
    if (equal(coords, [-1, -1])) {
      coords = [0, 0];
    } else {
      const key = arrowKeys.findIndex((v) => v === event.key);
      switch (key) {
        case 0:
          coords[0]--;
          break;
        case 1:
          coords[1]++;
          break;
        case 2:
          coords[0]++;
          break;
        case 3:
          coords[1]--;
          break;
        default:
          return;
      }
      coords = coords.map((c) => {
        if (c < 0) {
          c = 0;
        }
        if (c >= topCoords) {
          c = topCoords - 1;
        }
        return c;
      }) as [number, number];
    }
    vueTubleGame.actionSelectBlock([coords[0], coords[1]]);
  } else if (event.key === "x") {
    document.getElementById("action-rotate-left")?.click();
  } else if (event.key === "c") {
    document.getElementById("action-rotate-right")?.click();
  } else if (event.key === " ") {
    document.getElementById("action-submit")?.click();
  }
}

// Keyboard controls
onMounted(() => {
  window.addEventListener("keydown", keyboardListener);
});

onBeforeUnmount(() => {
  if (timerProcess) {
    clearInterval(timerProcess);
  }
  window.removeEventListener("keydown", keyboardListener);
});
</script>

<template>
  <SectionTitle class="title" :name="$t('p_index.btnTuble')" />
  <div class="stats">
    <h4>
      <PhTimer
        size="1em"
        color="currentColor"
        class="space-after"
      /><TextSeparator />{{ timerStatus }}
    </h4>
    <h4>
      <PhHandTap
        size="1em"
        color="currentColor"
        class="space-after"
      /><TextSeparator />{{ vueTubleGame.moves }}
    </h4>
    <EffectButton colour="--tuble" mini circle @click="openHelp"
      ><PhQuestion size="1em" color="currentColor"
    /></EffectButton>
  </div>
  <p v-if="vueTubleGame.isFrozen" class="next">
    {{ $t("tuble.hud.finish") }}
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
        />
      </td>
    </tr>
  </table>
  <div class="controls">
    <EffectButton
      id="action-rotate-left"
      colour="--tuble"
      :disabled="vueTubleGame.isFrozen"
      @click="vueTubleGame.actionRotate(false)"
      ><PhArrowCounterClockwise size="1em" color="currentColor"
    /></EffectButton>
    <EffectButton
      id="action-submit"
      colour="--tuble"
      :text="$t('tuble.hud.submit')"
      :disabled="vueTubleGame.isFrozen"
      @click="validate"
    />
    <EffectButton
      id="action-rotate-right"
      colour="--tuble"
      :disabled="vueTubleGame.isFrozen"
      @click="vueTubleGame.actionRotate(true)"
      ><PhArrowClockwise size="1em" color="currentColor"
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
  align-items: center;
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
