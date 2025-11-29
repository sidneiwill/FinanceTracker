<script setup lang="ts">
import TransactionsPage from './pages/TransactionsPage.vue';
import Header from './components/DefaultHeader.vue';
import AccountsPage from './pages/AccountsPage.vue';
import { ref } from 'vue';

const routes = {
  transactions: TransactionsPage,
  accounts : AccountsPage
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
