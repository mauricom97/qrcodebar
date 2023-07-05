<template>
  <div>
    <q-btn color="primary" label="Cadastrar mesa" class="absolute-top-right q-ma-sm

"/>
    <div class="q-pa-md example-col-gutter-vertical">
    
    <div class="row q-col-gutter-y-md">
      <div class="col-4" v-for="(table, index) in tablesCompanies" :key="index">
        <q-card flat bordered class="my-card q-ma-md
">
          <q-card-section>
            <div class="text-h6">{{table.num}}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-h6">
                Detalhes da mesa
            </div>
            {{table.description}}
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            <div style="align-items: center; text-align: center;">
                <img :src="table.qrcode" alt="" style="width: 300px; ">
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            tablesCompanies: []
        }
    },
    mounted() {
    this.getTablesCompanies();
  },
  methods: {
    getTablesCompanies() {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:3006/tableCompany/",
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
