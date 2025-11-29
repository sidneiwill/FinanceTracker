<script lang="ts">
import { ref } from 'vue'

export default {
  props: {
    page: String,
  },
  setup (props) {
    return {
      tab: ref(props.page)
    }
  }
}
</script>

<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-primary text-white">
      <!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->
      <q-toolbar-title>Finance Tracker</q-toolbar-title>

      <q-tabs v-model="tab">
        <q-tab name="transactions" label="Transactions" to="/transactions" @click="$emit('change-page', 'transactions')" />
        <q-tab name="accounts" label="Accounts" to="/accounts" @click="$emit('change-page', 'accounts')" />
      </q-tabs>
      
      <q-separator vertical inset />
      <q-btn flat round dense icon="menu">
        <q-menu>
          <q-list>
            <q-item clickable v-ripple>
              <q-item-section>Opcões</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple:red-5>
              <q-item-section>Sair</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </div>
</template>