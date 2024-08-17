<script setup lang="ts">
import {
  PhGameController,
  PhBriefcase,
  PhLinkedinLogo,
  PhGithubLogo,
} from "@phosphor-icons/vue";
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
        ><PhBriefcase size="1em" color="currentColor"
      /></EffectButton>
      <EffectButton :text="$t('p_index.btnTuble')" to="tuble" colour="--tuble"
        ><PhGameController size="1em" color="currentColor"
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
        ><PhLinkedinLogo size="1em" color="currentColor"
      /></EffectButton>
      <EffectButton
        text="GitHub"
        href="https://github.com/superwave1999"
        colour="--github"
        ><PhGithubLogo size="1em" color="currentColor"
      /></EffectButton>
    </ButtonRow>
    <HorizontalDivider />
    <ContentSection :name="$t('p_index.hobby.heading')">
      <p>{{ $t("p_index.hobby.text") }}</p>
    </ContentSection>
  </section>
</template>
