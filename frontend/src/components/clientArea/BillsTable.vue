<template>
  <div class="q-pa-md example-col-gutter-mixed">
    <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
      <div class="col-4" v-for="bill in onlyBills" :key="bill">
        <div class="my-content">
          <q-card flat bordered clicked class="my-card">
            <q-card-section>
              <div class="text-subtitle2" style="text-align: center">
                {{ bill }}
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
      onlyBills: null,
      bills: []
    };
  },
  mounted() {
    this.getBills();
  },
  methods: {
    getBills() {
        const token = this.$route.query.token;

        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${process.env.VUE_APP_SERVICE_CACHE_URL}/bills`,
          headers: {
            token: token
          }
        };

        axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            console.log(response.data);
            this.onlyBills = response.data.bills.map((bill) => bill);
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }
};
</script>
