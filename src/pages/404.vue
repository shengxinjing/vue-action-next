<script setup lang="ts">
import { ref } from 'vue'
const name = ref('404')
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
    <p>This is an {{ name }} page</p>
  </div>
</template>
