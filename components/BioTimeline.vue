<template>
  <div class="timeline">
    <div class="entry">
      <p class="date">
        1999
        <TextSeparator />
      </p>
      <p class="text">{{ $t("p_index.bio.n1") }}</p>
    </div>
    <div class="entry">
      <p class="date">
        2005
        <TextSeparator />
      </p>
      <p class="text">{{ $t("p_index.bio.n2") }}</p>
    </div>
    <div class="entry">
      <p class="date">
        2011
        <TextSeparator />
      </p>
      <p class="text">{{ $t("p_index.bio.n3") }}</p>
    </div>
    <div class="entry">
      <p class="date">
        2017
        <TextSeparator />
      </p>
      <p class="text">
        {{ $t("p_index.bio.n4") }}
      </p>
    </div>
    <div class="entry">
      <p class="date">
        2019
        <TextSeparator />
      </p>
      <p class="text">
        {{ $t("p_index.bio.n5") }}
      </p>
    </div>
    <div class="entry">
      <p class="date">
        2019
        <TextSeparator />
      </p>
      <p class="text">
        {{ $t("p_index.bio.n6")
        }}<a class="company" href="https://www.comerline.es/">Comerline</a>.
      </p>
    </div>
    <div class="entry">
      <p class="date">
        2023
        <TextSeparator />
      </p>
      <p class="text">
        {{ $t("p_index.bio.n7")
        }}<a class="company2" href="https://www.getronics.com/">Getronics</a>.
      </p>
    </div>
    <div class="v-decorator" />
  </div>
</template>

<style scoped>
div.timeline {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

div.entry {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

div.entry > p.text {
  flex: 1 0;
}

a {
  color: var(--text);
  text-decoration: underline;
  transition: color var(--transition-speed) ease-in-out;
}

a.company {
  text-decoration-color: var(--company);
}

a.company:hover {
  color: var(--company);
}

a.company2 {
  text-decoration-color: var(--company2);
}

a.company2:hover {
  color: var(--company2);
}
</style>
