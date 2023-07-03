<template>
  <div class="fullscreen">
    <q-layout
      view="lHh Lpr lff"
      container
      style="height: 100%"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated class="bg-cyan-8 ">
        <q-toolbar>
          <q-toolbar-title>{{ company.nomeFantasia }}</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer"
        show-if-above 
        :width="200" 
        :breakpoint="400">
        <q-scroll-area
          style="
            height: calc(100% - 150px);
            margin-top: 150px;
            border-right: 1px solid #ddd;
          "
        >
          <q-list padding>
            <q-item
              :active="typeView === 'bills'"
              clickable
              v-ripple
              @click="modifyDrawer('bills')"
            >
              <q-item-section avatar>
                <q-icon name="edit_note" />
              </q-item-section>

              <q-item-section> Pedidos </q-item-section>
            </q-item>

            <q-item
              :active="typeView === 'crudCategory'"
              clickable
              v-ripple
              @click="modifyDrawer('crudCategory')"
            >
              <q-item-section avatar>
                <q-icon name="category" />
              </q-item-section>

              <q-item-section> Categories </q-item-section>
            </q-item>

            <q-item
              :active="typeView === 'crudItens'"
              clickable
              v-ripple
              @click="modifyDrawer('crudItens')"
            >
              <q-item-section avatar>
                <q-icon name="view_list" />
              </q-item-section>

              <q-item-section> Itens </q-item-section>
            </q-item>

            
            <q-item
              :active="typeView === 'paymentArea'"
              clickable
              v-ripple
              @click="modifyDrawer('paymentArea')"
            >
              <q-item-section avatar>
                <q-icon name="payments" />
              </q-item-section>

              <q-item-section> Área de pagamento </q-item-section>
            </q-item>



          </q-list>





          <q-list class="absolute-bottom">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>

              <q-item-section> Perfil </q-item-section>

              <q-menu transition-show="jump-down" transition-hide="jump-up">
                <q-list style="min-width: 100px">
                  <q-item clickable>
                    <q-item-section avatar>
                      <q-icon name="manage_accounts" />
                    </q-item-section>
                    <q-item-section>Editar usuario</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable @click="logout()">
                    <q-item-section avatar>
                      <q-icon color="negative" name="logout" />
                    </q-item-section>
                    <q-item-section icon="logout">Logout</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px; text-align: center"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img alt="logo" src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="text-weight-bold">
              {{ user.firstName }} {{ user.lastName }}
            </div>
            <div>{{ user.email }}</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <TablesCompany v-if="typeView === 'bills'"></TablesCompany>
          <CategoryCrud v-if="typeView === 'crudCategory'"></CategoryCrud>
          <ItensCrud v-if="typeView === 'crudItens'"></ItensCrud>
          <PaymentArea v-if="typeView === 'paymentArea'"></PaymentArea>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import TablesCompany from "./TablesCompany.vue";
import CategoryCrud from "./CategoryCrud";
import ItensCrud from "./ItensCrud.vue";
import PaymentArea from "./PaymentArea.vue";
import { ref } from "vue";
import axios from "axios";
export default {
  setup() {
    return {
      drawer: ref(false),
      send: ref(false)
    };
  },
  components: {
    TablesCompany,
    CategoryCrud,
    ItensCrud,
    PaymentArea
  },
  data() {
    return {
      typeView: "bills",
      user: {
        firstName: "",
        lastName: "",
        email: ""
      },
      company: {
        cnpj: "",
        stateRegistration: "",
        razaoSocial: "",
        nomeFantasia: "",
        phone: "",
        state: "",
        city: "",
        neighborhood: "",
        address: ""
      }
    };
  },
  mounted() {
    this.getUser();
    this.getCompany();
  },
  methods: {

    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    modifyDrawer(type) {
      this.typeView = type;
      this.drawer = false;
    },

    getCompany() {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.VUE_APP_BACKEND_URL}/company/getCompanyToken`,
        headers: {
          token: localStorage.getItem("token")
        }
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.company = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getUser() {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.VUE_APP_BACKEND_URL}/collaborator/getUserToken`,
        headers: {
          token: localStorage.getItem("token")
        }
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.user = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.fullscreen {
  height: 100vh; /* Define a altura da div como 100% da altura da tela */
  width: 100vw; /* Define a largura da div como 100% da largura da tela */
}
</style>
