<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import { PhHandTap, PhTimer } from "@phosphor-icons/vue";
import dayjs from "dayjs";
import TubleValidator from "assets/js/tuble-validator";

const props = defineProps<{
  title?: string;
  stats: TubleValidator;
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
}>();

const formattedBaseTime = computed(() => {
  return dayjs(props.stats.timeMs).format("mm:ss");
});

function formatTimeStat(ms: number, multiplier: number, sign = "+") {
  const timePerBlock = dayjs(ms).format("ss");
  const totalTime = dayjs(ms * multiplier).format("mm:ss");
  return `${sign}${totalTime} (${timePerBlock}s x${multiplier})`;
}

function formatMoveStat(amount: number, blockMultiplier: number, sign = "+") {
  const total = amount * blockMultiplier;
  return `${sign}${total} (${amount} x${blockMultiplier})`;
}

const formattedNetTime = computed(() => {
  let prefix = "";
  const val = props.stats.netTimeMs;
  if (val < 0) {
    prefix = "-";
  }
  const timeStr = dayjs(val).format("mm:ss");
  return `${prefix}${timeStr}`;
});
</script>

<template>
  <VueFinalModal
    class="modal"
    content-class="popup modalcontent"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h3 class="title">{{ title }}</h3>
    <table>
      <thead>
        <tr>
          <td></td>
          <td>
            <PhTimer size="1em" color="currentColor" class="space-after" />{{
              $t("tuble.modal.statTitleTime")
            }}
          </td>
          <td>
            <PhHandTap size="1em" color="currentColor" class="space-after" />{{
              $t("tuble.modal.statTitleMoves")
            }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ $t("tuble.modal.statTitleBase") }}</td>
          <td>{{ formattedBaseTime }}</td>
          <td>{{ stats.moves }}</td>
        </tr>
        <tr>
          <td>{{ $t("tuble.modal.statTitleMod") }}</td>
          <td v-if="stats.timeBenefitBlocks" class="green">
            {{ formatTimeStat(4000, stats.timeBenefitBlocks, "-") }}
          </td>
          <td v-else-if="stats.timePenaltyBlocks" class="red">
            {{ formatTimeStat(7000, stats.timePenaltyBlocks, "+") }}
          </td>
          <td v-else>00:00</td>
          <td v-if="stats.moveBenefitBlocks" class="green">
            {{ formatMoveStat(2, stats.moveBenefitBlocks, "-") }}
          </td>
          <td v-else-if="stats.movePenaltyBlocks" class="red">
            {{ formatMoveStat(3, stats.movePenaltyBlocks, "+") }}
          </td>
          <td v-else>-</td>
        </tr>
        <tr>
          <td>{{ $t("tuble.modal.statTitleFinal") }}</td>
          <td>{{ formattedNetTime }}</td>
          <td>{{ stats.netMoves }}</td>
        </tr>
      </tbody>
    </table>
    <div class="button-row">
      <EffectButton
        :text="$t('tuble.modal.confirm')"
        colour="--accent"
        mini
        @click="emit('confirm')"
      ></EffectButton>
    </div>
  </VueFinalModal>
</template>

<style scoped>
table {
  border-spacing: 1.6ch;
  font-family: var(--typeface-serif);
}

table td {
  text-align: right;
}

table td:first-child,
table thead,
table tbody tr:last-child {
  font-weight: var(--font-thicc);
}

table td.red {
  color: #f42b03;
}

table td.green {
  color: #439a86;
}
</style>
