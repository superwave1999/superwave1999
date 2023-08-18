<script setup lang="ts">
import { Gamepad, LargeSuitcase, LinkedIn, GitHub } from "@iconoir/vue";
const { t } = useI18n();
useHead({
  title: t("p_index.headTitle"),
  meta: [{ name: "description", content: t("p_index.headDesc") }],
});
</script>

<template>
  <section>
    <TopCard />
    <ButtonRow>
      <EffectButton
        :text="$t('p_index.btnPortfolio')"
        to="projects"
        colour="--portfolio"
        ><LargeSuitcase
      /></EffectButton>
      <EffectButton :text="$t('p_index.btnTuble')" to="tuble" colour="--tuble"
        ><Gamepad
      /></EffectButton>
    </ButtonRow>
    <HorizontalDivider />
    <ContentSection :name="$t('p_index.about.heading')">
      <p style="text-align: justify">
        {{ $t("p_index.about.text") }}
      </p>
    </ContentSection>
    <HorizontalDivider />
    <ContentSection :name="$t('p_index.bio.heading')">
      <BioTimeline />
    </ContentSection>
    <ButtonRow>
      <EffectButton
        text="LinkedIn"
        href="https://www.linkedin.com/in/imanol-romera-lockhart-841803188/"
        colour="--linkedin"
        ><LinkedIn
      /></EffectButton>
      <EffectButton
        text="GitHub"
        href="https://github.com/superwave1999"
        colour="--github"
        ><GitHub
      /></EffectButton>
    </ButtonRow>
    <HorizontalDivider />
    <ContentSection :name="$t('p_index.hobby.heading')">
      <p>{{ $t("p_index.hobby.text") }}</p>
    </ContentSection>
  </section>
</template>
