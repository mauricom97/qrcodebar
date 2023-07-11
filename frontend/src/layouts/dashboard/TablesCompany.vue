<template>
  <div>
    <q-btn
      color="primary"
      @click="modalCreateTable = true"
      label="Cadastrar mesa"
      class="absolute-top-right q-ma-sm"
    />
    <div class="q-pa-md example-col-gutter-vertical">
      <div class="row q-col-gutter-y-md">
        <div
          class="col-4"
          v-for="(table, index) in tablesCompanies"
          :key="index"
        >
          <q-card flat bordered class="my-card q-ma-md">
            <q-card-section>
              <div class="text-h6">{{ table.num }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-h6">Detalhes da mesa</div>
              {{ table.description }}
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              <div style="align-items: center; text-align: center">
                <img :src="table.qrcode" alt="" style="width: 300px" />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <q-dialog v-model="modalCreateTable">
      <q-card style="width: 30%">
        <q-card-section>
          <div class="text-h6">Cadastrar mesa</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div>
            <q-input
              outlined
              class="q-mb-sm"
              v-model="newTable.num"
              type="number"
              label="Numero da mesa"
            />
            <q-input
              outlined
              class="q-mb-sm"
              v-model="newTable.description"
              type="textarea"
              label="Descrição da mesa"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cadastrar mesa"
            @click="createTableCompany()"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client/dist/socket.io";

export default {
  data() {
    return {
      tablesCompanies: [],
      modalCreateTable: false,
      newTable: {
        num: "",
        description: ""
      }
    };
  },

  created() {
    this.socket = io(process.env.VUE_APP_BACKEND_URL);
  },

  mounted() {
    this.getTablesCompanies();
    this.socket.on("changeTablesCompany", (data) => {
      this.getTablesCompanies();
    });
  },
  methods: {
    getTablesCompanies() {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.VUE_APP_BACKEND_URL}/tableCompany/`,
        headers: {
          token: localStorage.getItem("token")
        }
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.tablesCompanies = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createTableCompany() {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.VUE_APP_BACKEND_URL}/tableCompany/create`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: this.newTable
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteTableCompany(table) {
      console.log(table);
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${process.env.VUE_APP_BACKEND_URL}/tableCompany/delete/${table._id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="sass">
.example-col-gutter-vertical
  .my-content
    padding: 10px 15px
    background: rgba(#999,.15)
    border: 1px solid rgba(#999,.2)
</style>
