<template>
  <div class="home">
    <img alt="Sano logo" src="../assets/sano_logo.png" class="logo">
    <LookupsList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LookupsList from '@/components/LookupsList.vue' // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    LookupsList
  }
})
</script>

<style>
.logo {
  width: 300px
}
</style>
