<template>
  <div>
    <div class="text-h5 q-ma-md" style="text-align: center">
      {{ bill ? `Comanda: ${bill}` : "Nenhuma comanda selecionada" }}
    </div>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="menu">
        <MenuClient class="q-pa-md q-mt-none q-pa-none" />
      </q-tab-panel>

      <q-tab-panel name="bills">
        <BillsTable class="q-pa-md q-mt-none q-pa-none" />
      </q-tab-panel>
    </q-tab-panels>

    <q-separator />

    <q-tabs
      v-model="tab"
      dense
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      align="justify"
      narrow-indicator
      class="fixed-bottom"
    >
      <q-tab name="menu" label="Cardapio" />
      <q-tab name="bills" label="Comandas" />
    </q-tabs>
  </div>
</template>

<script>
import { ref } from "vue";
import MenuClient from "./MenuClient.vue";
import BillsTable from "./BillsTable.vue";
export default {
  setup() {
    return {
      tab: ref("menu")
    };
  },
  data() {
    return {
      bill: null
    };
  },
  mounted() {
    this.bill = localStorage.getItem("bill");
  },
  components: {
    MenuClient,
    BillsTable
  }
};
</script>
