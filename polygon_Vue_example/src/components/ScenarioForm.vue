<template>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <input v-model="nazev" class="form-control" placeholder="Název" />
    </div>
    <div class="mb-3">
      <input v-model="popis" class="form-control" placeholder="Popis" />
    </div>
    <div class="mb-3">
      <input v-model="md_navod" class="form-control" placeholder="Název souboru s návodem (např. navod3.md)" />
    </div>
    <div class="mb-3">
      <input v-model="odkaz" class="form-control" placeholder="URL na Proxmox" />
    </div>
    <button type="submit" class="btn btn-success">Přidat</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

// eslint-disable-next-line no-undef
const emit = defineEmits(['add'])
const nazev = ref('')
const popis = ref('')
const md_navod = ref('')
const odkaz = ref('')

const submit = () => {
  emit('add', {
    id: Date.now(),
    nazev: nazev.value,
    popis: popis.value,
    md_navod: md_navod.value,
    odkaz: odkaz.value,
    aktivni: true
  })

  nazev.value = ''
  popis.value = ''
  md_navod.value = ''
  odkaz.value = ''
}
</script>
