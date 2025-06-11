<template>
  <div class="card mb-3" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ scenar.nazev }}</h5>
      <p class="card-text">{{ scenar.popis }}</p>
      <RouterLink :to="`/scenar/${scenar.id}`" class="btn btn-primary">Zobrazit</RouterLink>
    </div>
  </div>
</template>

<script setup>
 // eslint-disable-next-line no-undef
defineProps({ scenar: Object });
</script>
