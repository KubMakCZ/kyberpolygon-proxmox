<template>
  <div class="container mt-4">
    <h2>Správa scénářů</h2>
    <table class="table">
      <thead><tr><th>Název</th><th>Stav</th><th>Akce</th></tr></thead>
      <tbody>
        <tr v-for="s in scenare" :key="s.id">
          <td>{{ s.nazev }}</td>
          <td>
            <span class="badge" :class="s.aktivni ? 'bg-success' : 'bg-secondary'">
              {{ s.aktivni ? 'Aktivní' : 'Neaktivní' }}
            </span>
          </td>
          <td>
            <button @click="toggle(s)" class="btn btn-sm btn-warning">Přepnout</button>
            <button @click="remove(s)" class="btn btn-sm btn-danger ms-2">Smazat</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h4 class="mt-4">Nový scénář</h4>
    <ScenarioForm @add="pridatScenar" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ScenarioForm from '@/components/ScenarioForm.vue'
import scenareJson from '@/assets/scenarios.json'

const scenare = ref([...scenareJson])

const toggle = s => s.aktivni = !s.aktivni
const remove = s => scenare.value = scenare.value.filter(x => x.id !== s.id)
const pridatScenar = novy => scenare.value.push(novy)
</script>
