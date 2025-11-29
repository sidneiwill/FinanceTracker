<script setup lang="ts">
  import { addAcount, readAcounts, clearAcounts } from '../db';
</script>


<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-primary text-white">
      <!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->
      <q-toolbar-title>Finance Tracker</q-toolbar-title>

<q-tabs>
  <q-tab name="home" label="Home" to="/" />
  <q-tab name="accounts" label="Contas" to="/contas" />
</q-tabs>
      
      <q-separator vertical inset />
      <q-btn flat round dense icon="menu">
        <q-menu>
          <q-list>
            <q-item clickable v-ripple:green @click='readAcounts()'>
              <q-item-section>Listar Contas</q-item-section>
            </q-item>
            <q-item clickable v-ripple:red-5>
              <q-item-section>Contas</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

    </q-toolbar>
  </div>
</template>

export default {
  name: 'Header',
}