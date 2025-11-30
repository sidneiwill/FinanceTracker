<template>
  <q-layout view="hHh Lpr lff" class="bg-grey-2">
    <q-page-container>
      <q-page class="q-pa-md">
        <div class="column q-gutter-md">
          <q-card flat bordered class="q-pa-sm bg-white">
            <div class="row items-center justify-between">
              <div class="text-h6 text-primary q-pa-sm">
                <span class="text-weight-bold">Total de Contas:</span> {{ accounts.length }}
              </div>

              <q-btn
                label="Adicionar Conta"
                icon="add"
                color="primary"
                @click="showCreateModal = true"
                rounded
                class="shadow-4"
              />

            </div>
          </q-card>

          <q-card flat bordered class="q-pa-md bg-white">
            <div class="text-subtitle1 text-grey-8 q-mb-sm">Filtrar Contas</div>
            <q-input
              v-model="filter"
              outlined
              dense
              placeholder="Pesquisar por nome ou ID..."
              clearable
              icon="search"
            />
          </q-card>

          <q-card flat bordered class="bg-white">
            <q-table
              title="Tabela Contas"
              :rows="filteredAccounts"
              :columns="columns"
              row-key="id"
              :rows-per-page-options="[10, 20, 50, 0]"
              :grid="$q.screen.lt.md"
              :hide-header="$q.screen.lt.md"
              class="q-px-md"
            >

            <!-- Responsivo -->
            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                <q-card flat bordered class="q-pa-md">
                  <q-list dense>
                    <q-item v-for="col in props.cols.filter((col: { name: string; }) => col.name !== 'id')" :key="col.name">
                      <q-item-section>
                        <q-item-label>{{ col.label }}:</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label caption>{{ col.value }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <div class="row justify-end q-mt-md">
                        <q-btn 
                          icon="delete"
                          color="red"
                          @click="db.accounts.delete(props.row.id).then(() => loadAccounts())"
                        />
                    </div>
                  </q-list>
                </q-card>
              </div>
            </template>

              <!-- Desktop -->
            <template v-slot:body="props">
                <tr 
                  @contextmenu.prevent="openMenu($event, props.row)"
                  :class="props.rowClass"
                >
                  <td v-for="col in props.cols" :key="col.name">
                    {{ props.row[col.field] }}
                  </td>
                </tr>
                
                <q-menu ref="menu" context-menu touch-position>
                  <q-list dense>
                    <q-item clickable v-close-popup @click="editar(selectedRow)">
                      <q-item-section>Editar</q-item-section>
                    </q-item>
                    <q-item clickable  v-close-popup @click="db.accounts.delete(props.row.id).then(() => loadAccounts())">
                      <q-item-section>Apagar</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
                           
              </template>


            </q-table>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>

  <q-dialog v-model="showCreateModal" persistent>
    <q-card style="width: 400px; max-width: 90vw;">
      <q-card-section class="row items-center q-pb-none bg-primary text-white">
        <div class="text-h6">Adicionar Nova Conta</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="showCreateModal = false" />
      </q-card-section>

      <q-card-section class="q-pt-md q-gutter-md">
        <q-input
          outlined
          v-model="newAccount.name"
          label="Nome da Conta"
        />
      </q-card-section>

      <q-card-actions align="right" class="bg-grey-1 q-pa-md">
        <q-btn flat label="Cancelar" color="grey-8" @click="showCreateModal = false" />
        <q-btn label="Adicionar Conta" color="positive" @click="saveAccount" :disable="!isFormValid" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import db from '../services/db';
import { Account } from '../services/db';

const $q = useQuasar();

// Definição das colunas para a QTable
const columns = [
  { name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left', format: (val: number)  => val ? `#${val}` : 'N/A' },
  { name: 'name', required: true, label: 'Nome', field: 'name', align: 'left', sortable: true },
  { name: 'balance', label: 'Saldo Inicial', field: 'balance', align: 'right', sortable: true, format: (val: number) => `R$ ${val ? val.toFixed(2) : '0.00'}` },
];

const accounts = ref([]);
const filteredAccounts = ref([]);
const filter = ref('');

async function loadAccounts() {
  try {
    accounts.value = await db.accounts.toArray();
    filter.value = '';
    filteredAccounts.value = accounts.value;
  } catch (error) {
    console.error("Erro ao carregar contas do Dexie:", error);
    $q.notify({
      message: 'Erro ao carregar dados.',
      color: 'negative',
      icon: 'error',
    });
  }
}

onMounted(loadAccounts);

const showCreateModal = ref(false);
// const deleteAccountModal = ref(false);

const newAccount = ref({
  name: '',
  type: null,
  initialBalance: 0,
});

const isFormValid = computed(() => {
  return newAccount.value.name.trim() !== '';
});

watch(
  filter, 
  (value) => {
    if (!value.trim()) filteredAccounts.value = accounts.value;
    filteredAccounts.value = accounts.value?.filter((account: Account) => 
      account?.id?.toString().toLowerCase()?.includes(value.trim().toLowerCase()) 
      || account?.name.toLowerCase()?.includes(value.trim().toLowerCase())
    );
  }
)

async function saveAccount() {
  if (isFormValid.value) {
    try {
      const id = await db.accounts.add({
        name: newAccount.value.name.trim(),
      });

      console.log(`Nova conta salva com ID: ${id}`);

      await loadAccounts();

      $q.notify({
        message: `Conta "${newAccount.value.name}" criada com sucesso!`,
        color: 'green-6',
        icon: 'check',
        position: 'top',
      });
      // Fechar modal ao adicionar a conta, caso seja desejado adicionar mais de uma conta, manter o modal aberto
      // showCreateModal.value = false;
      newAccount.value = {
        name: '',
      };

    } catch (error) {
      console.error("Erro ao salvar conta no Dexie:", error);
      $q.notify({
        message: 'Erro ao salvar conta. Verifique o console.',
        color: 'negative',
        icon: 'warning',
      });
    }

  } else {
    $q.notify({
      message: 'Por favor, preencha o nome da conta.',
      color: 'red-6',
      icon: 'warning',
      position: 'top',
    });
  }
}
</script>

<style scoped>
.shadow-4 {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06);
}

.q-page > .column > .q-card:nth-child(3) {
  flex-grow: 1;
}
</style>
