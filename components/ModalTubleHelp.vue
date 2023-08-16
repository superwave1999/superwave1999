<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import { SingleTapGesture, Timer } from "@iconoir/vue";

const emit = defineEmits<{
  (e: "confirm"): void;
}>();

const fakeStraightBlock = { type: "n", x: 0, y: 0, connections: [1, 3] };
const fakeCurveBlock = { type: "n", x: 0, y: 0, connections: [0, 1] };
const fakeEndBlock = { type: "e", x: 0, y: 0, connections: [-1, 1] };
const fakeTimeBenefitBlock = { type: "a", x: 0, y: 0, connections: [1, 3] };
const fakeTimePenaltyBlock = { type: "x", x: 0, y: 0, connections: [1, 3] };
const fakeMoveBenefitBlock = { type: "b", x: 0, y: 0, connections: [1, 3] };
const fakeMovePenaltyBlock = { type: "z", x: 0, y: 0, connections: [1, 3] };

const frozen = true;
const modifiable = true;
const active = false;
</script>

<template>
  <VueFinalModal
    class="modal"
    content-class="popup modalcontent"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h2 class="title">{{ $t("tuble.help.title") }}</h2>
    <p class="notice">{{ $t("tuble.help.timeReminder") }}</p>
    <h4>{{ $t("tuble.help.section1") }}</h4>
    <p>{{ $t("tuble.help.s1p1") }}</p>
    <p>{{ $t("tuble.help.s1p2") }}</p>
    <p>{{ $t("tuble.help.s1p3") }}</p>
    <p>{{ $t("tuble.help.s1p4") }}</p>
    <h4>{{ $t("tuble.help.section2") }}</h4>
    <table class="ui">
      <tbody>
        <tr>
          <td>
            <Timer />
          </td>
          <td>{{ $t("tuble.help.s2d1") }}</td>
        </tr>
        <tr>
          <td>
            <SingleTapGesture />
          </td>
          <td>{{ $t("tuble.help.s2d2") }}</td>
        </tr>
      </tbody>
    </table>
    <h4>{{ $t("tuble.help.section3") }}</h4>
    <p>{{ $t("tuble.help.s3p1") }}</p>
    <p>{{ $t("tuble.help.s3p2") }}</p>
    <p>{{ $t("tuble.help.s3p3") }}</p>
    <p>{{ $t("tuble.help.s3p4") }}</p>
    <h4>{{ $t("tuble.help.section4") }}</h4>
    <table>
      <tbody>
        <tr>
          <td class="extra-static pipe">
            <TubleBlock
              :properties="fakeStraightBlock"
              :is-frozen-game="frozen"
              :is-active-block="active"
              :is-modifiable="modifiable"
            />
          </td>
          <td>
            {{ $t("tuble.help.s4d1") }}
          </td>
        </tr>
        <tr>
          <td class="extra-static pipe">
            <TubleBlock
              :properties="fakeCurveBlock"
              :is-frozen-game="frozen"
              :is-active-block="active"
              :is-modifiable="modifiable"
            />
          </td>
          <td>
            {{ $t("tuble.help.s4d2") }}
          </td>
        </tr>
        <tr>
          <td class="extra-static pipe">
            <TubleBlock
              :properties="fakeEndBlock"
              :is-frozen-game="frozen"
              :is-active-block="active"
              :is-modifiable="modifiable"
            />
          </td>
          <td>
            {{ $t("tuble.help.s4d3") }}
          </td>
        </tr>
      </tbody>
    </table>

    <h4>{{ $t("tuble.help.section5") }}</h4>
    <table>
      <tbody>
        <tr>
          <td class="extra-static pipe">
            <TubleBlock
              :properties="fakeTimeBenefitBlock"
              :is-frozen-game="frozen"
              :is-active-block="active"
              :is-modifiable="modifiable"
            />
          </td>
          <td>
            {{ $t("tuble.help.s5d1") }}
          </td>
        </tr>
        <tr>
          <td class="extra-static pipe">
            <TubleBlock
              :properties="fakeTimePenaltyBlock"
              :is-frozen-game="frozen"
              :is-active-block="active"
              :is-modifiable="modifiable"
            />
          </td>
          <td>
            {{ $t("tuble.help.s5d2") }}
          </td>
        </tr>
        <tr>
          <td class="extra-static pipe">
            <TubleBlock
              :properties="fakeMoveBenefitBlock"
              :is-frozen-game="frozen"
              :is-active-block="active"
              :is-modifiable="modifiable"
            />
          </td>
          <td>
            {{ $t("tuble.help.s5d3") }}
          </td>
        </tr>
        <tr>
          <td class="extra-static pipe">
            <TubleBlock
              :properties="fakeMovePenaltyBlock"
              :is-frozen-game="frozen"
              :is-active-block="active"
              :is-modifiable="modifiable"
            />
          </td>
          <td>
            {{ $t("tuble.help.s5d4") }}
          </td>
        </tr>
      </tbody>
    </table>

    <h4>{{ $t("tuble.help.sectionKb") }}</h4>
    <table class="kb">
      <tbody>
        <tr>
          <td>
            {{ $t("tuble.help.keyRLeft") }}
          </td>
          <td>
            {{ $t("tuble.help.descRLeft") }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t("tuble.help.keyRRight") }}
          </td>
          <td>
            {{ $t("tuble.help.descRRight") }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t("tuble.help.keyValid") }}
          </td>
          <td>
            {{ $t("tuble.help.descValid") }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t("tuble.help.keyUp") }}
          </td>
          <td>
            {{ $t("tuble.help.descUp") }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t("tuble.help.keyRight") }}
          </td>
          <td>
            {{ $t("tuble.help.descRight") }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t("tuble.help.keyDown") }}
          </td>
          <td>
            {{ $t("tuble.help.descDown") }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t("tuble.help.keyLeft") }}
          </td>
          <td>
            {{ $t("tuble.help.descLeft") }}
          </td>
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
p.notice {
  font-size: 0.8em;
  text-align: center;
}

h4 {
  font-weight: var(--font-thicc);
}

table,
p {
  border-spacing: 1.6ch;
  font-family: var(--typeface-serif);
}

table.ui tbody td:first-child,
table.kb tbody td:first-child {
  font-weight: var(--font-thicc);
  text-align: center;
  font-size: 1.2em;
}

table.ui tbody td:first-child {
  font-size: 1.5em;
}
</style>
