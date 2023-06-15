<template>
  <div class="q-pa-md example-col-gutter-mixed">
    <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
      <div class="col-12 col-md-4" v-for="item in itens" :key="item.uuid">
        <q-card flat bordered class="my-card">
          <q-card-section>
            <q-item-section side top>
              <div>
                <q-badge
                  color="blue"
                  class="q-mx-sm"
                  text-color="black"
                  :label="'Mesa ' + item.table"
                />
                <q-badge
                  color="orange"
                  text-color="black"
                  :label="'Quantidade x' + item.quantity"
                />
              </div>
            </q-item-section>
            <div class="text-h6">
              {{ item.name }}
            </div>
            <div>
              <q-chip
                color="primary"
                @click="alterStatusItem()"
                icon="bookmark"
                >{{
                  item.status == 1 ? "Novo Pedido" : "Pedido entrgue"
                }}</q-chip
              >
              <q-chip
                color="red"
                text-color="white"
                icon="alarm"
                :label="item.waitingTime"
              />
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-h6">Observações do cliente</div>
            {{
              item.descriptionBill ? item.descriptionBill : "Sem observações"
            }}
          </q-card-section>

          <q-separator />

          <div>
            <q-slide-item @left="onLeft(item.uuid)" @right="onRight">
              <template v-slot:left>
                <q-icon name="done" />
              </template>

              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img alt="logo" src="../../../src/media/certo.png" draggable="false" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>Item entregue</q-item-section>
              </q-item>
            </q-slide-item>
          </div>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="modalAlterStatusItem">
      <q-card>
        <q-card-section>
          <div class="text-h6">Qual o status do item?</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list bordered separator>
            <q-item clickable v-ripple>
              <q-item-section>Em preparo</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>Entregue</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { onBeforeUnmount } from "vue";
import moment from "moment";
import _ from "lodash";
import axios from "axios";
import io from 'socket.io-client/dist/socket.io';

export default {
  data() {
    return {
      itens: []
    };
  },
  created() {
    this.socket = io(process.env.VUE_APP_BACKEND_URL);
  },
  setup() {
    const $q = useQuasar();
    let timer;

    function finalize(reset) {
      timer = setTimeout(() => {
        reset();
      }, 1000);
    }

    onBeforeUnmount(() => {
      clearTimeout(timer);
    });

    return {
      modalAlterStatusItem: ref(false),
      // async onLeft(uuidBill) {
      //   const audio = new Audio(require("../../assets/plim.mp3")); // Caminho para o arquivo de áudio
      //   await audio.play();
      //   console.log(this.itens)
      //   this.itens = this.itens.filter(item => item.uuid !== uuidBill);
      // },

      onRight({ reset }) {
        alert("ola");
      }
    };
  },

  mounted() {
    this.getBills();
    this.socket.on('changeBills', (data) => {
      this.getBills();
    })
  },

  methods: {
    alterStatusItem() {
      this.modalAlterStatusItem = true;
    },
    async onLeft(uuidBill) {
      const audio = new Audio(require("../../assets/plim.mp3")); // Caminho para o arquivo de áudio
      let data = JSON.stringify({
        status: 2
      });

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${process.env.VUE_APP_BACKEND_URL}/bills/update?uuid=${uuidBill}`,
        headers: {
          token:
          localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        data: data
      };

      axios
        .request(config)
        .then(async (response) => {
          console.log(JSON.stringify(response.data));
          setTimeout(() => {
            this.itens = this.itens.filter((item) => item.uuid !== uuidBill);
          }, 300);
          await audio.play();
        })
        .catch((error) => {
          console.log(error);
        });

    },

    getBills() {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.VUE_APP_BACKEND_URL}/bills/table`,
        headers: {
          token:
            localStorage.getItem("token")
        }
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.itens = response.data;
          this.itens = this.itens.filter((item) => item.status == 1);
          this.itens = _.orderBy(this.itens, ["createdAt"], ["asc"]);
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 401) {
              // Token inválido ou expirado, redireciona para a tela de login
              this.$router.push('/login')
            }
        });
    }
  }
};
</script>

<style lang="sass">
.example-col-gutter-mixed
  .my-content
    padding: 10px 15px
    background: rgba(#999,.15)
    border: 1px solid rgba(#999,.2)
</style>
