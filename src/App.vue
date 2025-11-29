<script setup lang="ts">
import ListarContas from './components/Transactions.vue';
import Header from './components/Header.vue';
import AccountPage from './components/AccountPage.vue';
import { ref } from 'vue';

const routes = {
  transactions: ListarContas,
  accounts : AccountPage
}

const currentPath = ref<string>('accounts');

function changePage(path: string) {
  currentPath.value = path;
};
</script>

<template>
  <div>
    <Header @change-page="changePage"></Header>
    <component :is="routes[currentPath]" />
    <!-- <AccountPage></AccountPage> -->
    <!-- <HelloWorld></HelloWorld> -->
    <!-- <ListarContas></ListarContas> -->
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
