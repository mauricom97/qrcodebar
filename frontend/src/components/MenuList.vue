<template>
  <div class="q-pa-md">
    <q-card flat bordered>
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
    <q-btn color="primary" class="fixed-bottom full-width" label="Confirmar pedido" />
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
  async created() {
    setTimeout(() => {
      this.getMenu();
    }, 1000);
  },

  methods: {
    updateQuantity(uuid, quantity) {
      this.$set(this.quantities, uuid, quantity);
    },
    async getMenu(){
      await axios
      .get(
        `https://app-backend-qrcodebar.onrender.com/item/menu?token=${this.$route.query.token}`
      )
      .then((response) => {
        
        this.menu = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }
};
</script>
