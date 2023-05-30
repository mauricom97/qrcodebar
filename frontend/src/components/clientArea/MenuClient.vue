<template>
  <div style="padding: 0px; margin: 0px">
    <q-list
      bordered
      class="rounded-borders q-my-md"
      v-for="(itensCategoria, category) in menu"
      :key="category"
    >
      <q-expansion-item class="q-pa-md">
        <template v-slot:header>
          <q-item-section> {{ category }} </q-item-section>
        </template>

        <q-card>
          <q-card-section>
            <q-list dense>
              <q-item v-for="item in itensCategoria" :key="item.uuid" clickable>
                <q-item-section class="item-details" style="padding: 2%">
                  <q-item-label>{{ item.name }}</q-item-label>
                  <q-item-label caption>{{ item.description }}</q-item-label>
                  <q-item-label style="color: rgb(0, 255, 13)" caption>
                    <q-badge outline align="middle" color="teal">
                      R${{ item.price }}
                    </q-badge>
                  </q-item-label>
                  <div class="details-button q-mt-sm abolsute-bottom">
                    <div class="quantity-control absolute-right q-mr-md">
                      <q-btn
                        @click="removeItem(item.uuid)"
                        icon="remove"
                        dense
                        flat
                      ></q-btn>
                      <!-- <div class="center-align" style="width: 25px">
                        {{ quantity }}
                      </div> -->
                      <q-input
                        v-model="itensRequestObj[item.uuid]"
                        type="number"
                        dense
                        class="center-align"
                        style="width: 25px"
                      ></q-input>
                      <q-btn
                        @click="addItem(item.uuid)"
                        icon="add"
                        dense
                        flat
                      ></q-btn>
                    </div>
                    <q-btn
                      outline
                      rounded
                      class="q-mt-md"
                      style="width: 100%"
                      color="primary"
                      label="Ver detalhes"
                      @click="showDetails(item)"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />
    </q-list>
    <q-btn
      :disable="itensRequestArray.length === 0"
      color="primary"
      size="xl"
      class="full-width"
      label="Conferir pedido"
      @click="dialogConfimRequest = true"
    />

    <q-dialog v-model="toolbar">
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
          </q-avatar>

          <q-toolbar-title
            ><span class="text-weight-bold">{{
              itemTitle
            }}</span></q-toolbar-title
          >

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <div class="col-4">
          <q-img src="https://picsum.photos/500/300" :ratio="16 / 9" />
        </div>
        <q-card-section>
          <q-badge outline align="middle" color="teal">
            R${{ itemPrice }}
          </q-badge>
          <br />
          {{ itensDetailsText }}
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogConfimRequest" class="fullscreen">
      <q-card style="width: 100%; height: 95%">
        <q-card-section>
          <div class="text-h6">Itens do pedido</div>
        </q-card-section>

        <q-separator />

        <div class="q-pa-md" style="width: 100%; height: 78%">
          <q-scroll-area style="width: 100%; height: 90%">
            <q-list>
              <q-item v-for="item in itensRequestArray" :key="item.uuid">
                <q-item-section>
                  <q-item-label>{{ item.name }}</q-item-label>
                  <q-item-label caption>{{ item.description }}</q-item-label>
                  <q-item-label style="color: rgb(0, 255, 13)" caption>
                    <q-badge outline align="middle" color="teal">
                      R${{ item.price }}
                    </q-badge>
                  </q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-badge color="teal"> x{{ item.quantity }} </q-badge>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>

        <div class="absolute-bottom">
          <div class="text-h6 q-ma-md" style="text-align: center">
            VALOR TOTAL: R${{ priceTotal }}
          </div>
          <q-separator />
          <q-card-actions align="right">
            <q-btn flat label="Voltar" color="primary" v-close-popup />
            <q-btn
              flat
              label="Enviar pedido"
              color="primary"
              @click="selectBill()"
            />
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalSelectBill">
      <q-card>
        <q-card-section>
          <div class="text-h6">Selecione uma comanda ou crie uma nova</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="q-pa-md" style="max-width: 350px">
            <q-list bordered separator>
              <q-item
                clickable
                v-ripple
                v-for="bill in existingBills"
                :key="bill"
              >
                <q-item-section
                  class="q-ma-sm text-h6"
                  style="text-align: center"
                  >{{ bill }}
                </q-item-section>
              </q-item>
            </q-list>
            <div class="q-ma-sm" style="text-align: center">
              <q-btn
                outline
                rounded
                :disable="btnCreateBill"
                color="primary"
                @click="createBill()"
                label="Criar outra comanda"
              />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" @click="sendRequest()" v-close-popup />
          <q-btn flat label="Confirmar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import { ref } from "vue";
import { mapGetters } from "vuex";
export default {
  name: "CafeMenu",

  data() {
    return {
      menu: null,
      quantities: {},
      tokenCardapio: null,
      quantity: 0,
      itensDetailsText: null,
      itemTitle: null,
      itemPrice: null,
      itensRequestObj: {},
      itensRequestArray: [],
      arrayItens: [],
      priceTotal: 0,
      bill: null,
      existingBills: [],
      btnCreateBill: false
    };
  },
  setup() {
    return {
      toolbar: ref(false),
      slide: ref(1),
      dialogConfimRequest: ref(false),
      modalSelectBill: ref(false)
    };
  },
  created() {},
  methods: {
    addItem(uuid) {
      this.itensRequestObj[uuid]++;
      const itemInfo = this.arrayItens.find((item) => item.uuid === uuid);
      const existItemInArray = this.itensRequestArray.find(
        (item) => item.uuid === uuid
      );
      if (existItemInArray) {
        existItemInArray.quantity++;
        this.itensRequestArray = this.itensRequestArray.filter(
          (item) => item.uuid !== uuid
        );
        this.itensRequestArray.push(existItemInArray);
      } else {
        this.itensRequestArray.push({
          uuid: uuid,
          quantity: 1,
          name: itemInfo.name,
          price: itemInfo.price,
          description: itemInfo.description
        });
      }
      this.itensRequestArray = _.orderBy(this.itensRequestArray, "name", "asc");
      let formato = new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      this.priceTotal = _.sumBy(this.itensRequestArray, (item) => {
        return parseFloat(item.price).toFixed(2) * item.quantity;
      });
      this.priceTotal = formato.format(this.priceTotal);
    },
    removeItem(uuid) {
      if (this.itensRequestObj[uuid] > 0) {
        this.itensRequestObj[uuid]--;
        const itemInfo = this.arrayItens.find((item) => item.uuid === uuid);
        let existItemInArray = this.itensRequestArray.find(
          (item) => item.uuid === uuid
        );
        if (existItemInArray) {
          existItemInArray.quantity--;
          this.itensRequestArray = this.itensRequestArray.filter(
            (item) => item.uuid !== uuid
          );
          if (existItemInArray.quantity > 0) {
            this.itensRequestArray.push(existItemInArray);
          }
        }
      }
    },
    showDetails(item) {
      this.toolbar = true;
      this.itensDetailsText = item.description;
      this.itemTitle = item.name;
      this.itemPrice = item.price;
    },

    selectBill() {
      if (this.existingBills.length > 0) {
        this.btnCreateBill = false;
        this.modalSelectBill = true;
      } else {
        this.bill = _.random(1000, 10000);
        localStorage.setItem("bill", this.bill);
        this.sendRequest();
      }
    },

    async createBill() {
      this.bill = _.random(1000, 10000);
      localStorage.setItem("bill", this.bill);
      await this.sendRequest();
      await this.getExistingBills();
      this.btnCreateBill = true;
    },

    sendRequest() {
      const token = this.$route.query.token;

      let data = { itens: [] };
      for (let item of this.itensRequestArray) {
        data.itens.push({
          uuid_item: item.uuid,
          quantity: item.quantity
        });
      }
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `http://192.168.1.7:3006/bills?bill=${this.bill}`,
        headers: {
          token: token,
          "Content-Type": "application/json",
          Cookie:
            "connect.sid=s%3AV3g5dSOLxkLL0nuuphuXfbg3qK63mxwG.q1RDkX6Xv2Xbkaclbwq3PbuBpworgveScSaMbd2%2FZlM"
        },
        data: data
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.itensRequestArray = [];
          this.priceTotal = 0;
          this.dialogConfimRequest = false;
          for (let category in this.menu) {
            for (let item of this.menu[category]) {
              this.itensRequestObj[item.uuid] = 0;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getMenu() {
      const token = this.$route.query.token;
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `http://192.168.1.7:3006/item/menu?token=${token}`
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.arrayItens = response.data.menu;
          this.menu = _.groupBy(this.arrayItens, "Category.name");
          for (let category in this.menu) {
            for (let item of this.menu[category]) {
              this.itensRequestObj[item.uuid] = 0;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getExistingBills() {
      const token = this.$route.query.token;

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://192.168.1.7:3353/bills",
        headers: {
          token: token
        }
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          console.log(response.data)
          this.existingBills = response.data.bills.map((bill) => bill)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getMenu();
    setInterval(() => {
      this.getExistingBills();
    }, 1000);
  }
};
</script>
<style>
.quantity-control {
  display: flex;
  align-items: center;
}

.quantity-control q-input {
  margin: 0 5px;
}
.center-align input[type="number"] {
  text-align: center;
}
</style>
