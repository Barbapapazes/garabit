<script lang="ts" setup>
import { useRoute } from 'vitepress'

const route = useRoute()

console.log(route)
</script>

<template>
  <div>
    <h1>Garabit Blog</h1>

    <Content />
  </div>
</template>
