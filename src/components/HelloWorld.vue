<script setup lang="ts">
import { reactive } from 'vue'

const accounts = reactive({
  labels: ['Santander', 'Sicredi', 'Itaú', 'Caixa', 'Banrisul'],
})

const mouths = reactive({
  chart: { id: 'basic-bar' },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
  }
})

const barSeries = reactive([
  { name: 'Saldo', data: [44, 55, 13, 43, 23, 55, 32, 44, 20] }
])

const donutSeries = reactive([44, 55, 13, 43, 23])
</script>

<template>
  <div class="grid-container">
      <h1>R$ 2.300,00</h1>
      <apexchart width="380" type="donut" :options="accounts" :series="donutSeries"/>



      <apexchart width="500" type="bar" :options="mouths" :series="barSeries"/>

      <apexchart width="500" type="bar" :options="mouths" :series="barSeries"/>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2 colunas */
  gap: 20px; /* espaço entre os itens */
}

.read-the-docs {
  color: #888;
}
</style>
