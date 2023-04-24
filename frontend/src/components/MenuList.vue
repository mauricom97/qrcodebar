<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <h1 class="text-h4">Menu do Café</h1>
      </q-card-section>
      <q-card-section>
        <q-list bordered separator>
          <q-item v-for="item in menu" :key="item.uuid">
            <q-item-section>
              <div>{{ item.name }}</div>
              <div>{{ item.description }}</div>
              <div>R$ {{ item.price }}</div>
            </q-item-section>
            <q-item-section side>
              <q-input
                dense
                type="number"
                :value="quantities[item.uuid] || 0"
                min="0"
                max="100"
                @input="updateQuantity(item.uuid, $event.target.value)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CafeMenu",

  data() {
    return {
      menu: [],
      quantities: {}
    };
  },

  created() {
    axios
      .get(
        "http://localhost:3006/item/menu?tableCompany&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hdXJpY2lvX251bmVzIiwiY29sbGFib3JhdG9yX3V1aWQiOiIwZDkzMDVlOC1kZGVlLTQwNTEtODUwNC05NWFmMTAzNmM3NDQiLCJjb21wYW55X3V1aWQiOiI0NGNhYmY5ZS00ZDk4LTQ0YWItYTkzMS1kZjFiZGE3MjVlZTEiLCJpYXQiOjE2ODIxMTc3MDcsImV4cCI6MTY4MjEyMTMwN30.IJG-N5YuTGNMKrrA3oMTykbXI5DK3dI4rJv5SaXeo9g"
      )
      .then((response) => {
        this.menu = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },

  methods: {
    updateQuantity(uuid, quantity) {
      this.$set(this.quantities, uuid, quantity);
    }
  }
};
</script>
