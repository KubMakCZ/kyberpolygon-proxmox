<template>
  <div class="container mt-4">
    <h2>{{ scenar?.nazev }}</h2>
    <p>{{ scenar?.popis }}</p>
    <a :href="scenar?.odkaz" target="_blank" class="btn btn-outline-secondary">Otevřít v Proxmox</a>
    <hr>
    <div v-html="markdownContent" class="mt-3"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import scenare from '@/assets/scenarios.json'
import { marked } from 'marked'

const route = useRoute()
const scenar = scenare.find(s => s.id == route.params.id)
const markdownContent = ref('')

onMounted(async () => {
  if (scenar) {
    const res = await fetch(`/scenarios/${scenar.md_navod}`)
    const text = await res.text()
    markdownContent.value = marked(text)
  }
})
</script>
