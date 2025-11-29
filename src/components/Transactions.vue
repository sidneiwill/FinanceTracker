<template>
    <div class="p-6 bg-white rounded-xl shadow-lg">

        <!-- LISTAGEM DE BANCOS -->
        <div class="mb-8 border-b pb-4">
            <div class="flex flex-wrap gap-4">
                <div v-for="account in accountsList" :key="account.id"
                     class="p-3 bg-indigo-50 text-primary font-semibold rounded-lg shadow-md border-l-4 border-primary">
                    <h1>{{ account.name }}</h1>
                </div>
            </div>

            <h1
                v-if="accountsList.length === 0 && !isLoading"
                class="text-sm text-red-500 mt-2"
            >
                Nenhum banco encontrado.
            </h1>
        </div>

    </div>
</template>


<script lang="ts">
import { ref, onMounted, Ref, defineComponent } from 'vue';
import type { Account } from '../db';
import { db } from '../db';

export default defineComponent({
    name: "ListarContas",

    setup() {
        const accountsList: Ref<Account[]> = ref([]);
        const isLoading: Ref<boolean> = ref(true);

        const fetchAccounts = async () => {
            db.accounts.toArray().then(accts => accts.map(act => accountsList.value.push(act)));

            isLoading.value = true;

            isLoading.value = false;
            
        };

        onMounted(fetchAccounts);

        return {
            accountsList,
            isLoading,
            fetchAccounts
        };
    }
});
</script>

<style scoped>
/* Se quiser estilização adicional, coloque aqui */
</style>
