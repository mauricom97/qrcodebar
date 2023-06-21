<template>
  <div class="q-pa-md example-col-gutter-mixed">
    <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
      <div class="row q-pb-xs" style="width: 100%">
        <q-input
          style="width: 100%"
          rounded
          outlined
          v-model="text"
          label="Buscar comanda"
          class="q-mt-md q-ml-md"
        />
      </div>
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 q-mt-md q-ml-md" v-for="bill in bills" :key="bill">
        <q-card class="my-card" flat bordered @click="modalDialog(bill[0].code)">
          <q-card-section>
            <div class="text-h3" style="text-align: center">{{ bill[0].code }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="dialogPayBill">
      <q-card>
        <q-toolbar>
          <q-icon size="xl" name="payment" />

          <q-toolbar-title>Pagamento</q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          <q-scroll-area style="height: 200px; max-width: 300px">
            <q-list dense bordered padding class="rounded-borders q-mb-sm">
              <q-item clickable v-ripple v-for="itemBill in itensInModelSelected" :key="itemBill.uuid">
                <q-item-section>{{ itemBill.name }}</q-item-section>
                <q-item-section side>
                  <q-item-label>
                    <q-badge color="orange" text-color="black" :label="itemBill.quantity + 'x'" />
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label>{{ itemBill.item.price }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
          <q-card-section>
            <div class="text-h5" style="text-align: center">Total: {{ totalPriceBill.toFixed(2) }}</div>
          </q-card-section>
          <q-card-section>
            <q-btn
              label="Cliente efetuou o pagamento"
              color="green-14"
              class="action-button"
              style="width: 100%"
              @click="confirmPayment"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="info" color="primary" text-color="white" />
          <span class="q-ml-sm">Tem certeza que deseja confirmar o recebimento da comanda {{ billSelected }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import { ref } from 'vue'
export default {
  setup () {
    return {
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),

      address: ref('')
    }
  },
  data() {
    return {
      bills: [],
      dialogPayBill: false,
      itensInModelSelected: null,
      totalPriceBill: 0,
      billSelected: null,
    };
  },

  mounted() {
    this.getBills();
  },

  methods: {
    getBills() {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.VUE_APP_BACKEND_URL}/bills/table`,
        headers: {
          token: localStorage.getItem("token")
        }
      };

      axios
        .request(config)
        .then((response) => {
          this.bills = _.groupBy(response.data, "code");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    modalDialog(bill) {
      this.dialogPayBill = true;
      console.log(this.bills);
      this.itensInModelSelected = this.bills[bill];
      this.totalPriceBill = _.sumBy(this.itensInModelSelected, function (o) {
        return o.item.price * o.quantity;
      });
    },
    confirmPayment() {
      this.confirm = true;
      // Aqui você pode adicionar a lógica para confirmar o pagamento do cliente
      // por exemplo, fazer uma requisição ao servidor para registrar o pagamento
    }
  }
};
</script>

<style scoped>
.example-col-gutter-mixed {
  .my-card {
    margin-bottom: 10px;
  }

  .action-button {
    margin-top: 10px;
  }
}
</style>
