<script setup lang="ts">
import { ref } from 'vue'
const name = ref('Home')
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
    <p>This is an {{ name }} page</p>
    <a-button>123</a-button>
  </div>
</template>
