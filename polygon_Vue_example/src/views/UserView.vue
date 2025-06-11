<template>
  <div class="container mt-4">
    <h2>Aktivní scénáře</h2>
    <div class="d-flex flex-wrap gap-3">
      <ScenarioCard
        v-for="scenar in scenare"
        :key="scenar.id"
        :scenar="scenar"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ScenarioCard from '@/components/ScenarioCard.vue'
import scenareData from '@/assets/scenarios.json'

const scenare = ref([])

onMounted(() => {
  scenare.value = scenareData.filter(s => s.aktivni)
})
</script>
