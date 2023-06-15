<template>
  <q-page>
    <q-table :rows="items" :columns="columns" row-key="uuid">
      <template v-slot:top-right>
        <q-btn
          color="primary"
          v-if="!showForm"
          @click="showForm = true"
          label="Novo Item"
        />
      </template>

      <template v-slot:body-cell-category="props">
        {{ getCategoryName(props.row.category) }}
      </template>

      <template v-slot:body-cell="props">
        <q-td :props="props">
          {{ props.value }}
        </q-td>

        <q-td :props="props">
          <q-btn
            color="primary"
            dense
            flat
            icon="edit"
            @click="editItem(props.row)"
          />

          <q-btn
            color="negative"
            dense
            flat
            icon="delete"
            @click="deleteItem(props.row)"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="showForm" persistent>
      <q-card style="width: 35%">
        <q-card-section>
          <div class="text-h4">Informações do item</div>
          <q-form @submit="saveItem">
            <q-input
              outlined
              v-model="form.name"
              class="q-mb-sm"
              label="Nome"
            />
            <q-input
              outlined
              v-model="form.price"
              type="text"
              label="Preço"
              :reverse="true"
              :mask-reverse="true"
              class="q-mb-sm"
            />
            <q-select
              outlined
              v-model="categorySelect"
              :options="optionsCategories"
              label="Selecione a categoria"
              class="q-mb-sm"
            />
            <q-checkbox v-model="form.menu" label="Item do cardapio" />

            <q-card-actions align="right">
              <q-btn
                color="primary"
                label="Salvar"
                @click="createItem()"
                type="submit"
              />
              <q-btn color="negative" label="Cancelar" @click="cancelForm" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import _ from "lodash";
import { Vue, router } from 'vue-router'


export default {
  name: "ItemTable",
  setup() {
    return {
      categorySelect: ref(null),
      optionsCategories: []
    };
  },
  data() {
    return {
      items: [],
      form: {
        uuid: "",
        name: "",
        price: "",
        menu: false
      },
      categories: [],
      showForm: false,
      columns: [
        {
          name: "name",
          required: true,
          label: "Nome",
          align: "left",
          field: "name"
        },
        {
          name: "price",
          required: true,
          label: "Preço",
          align: "left",
          field: "price"
        },
        {
          name: "category",
          required: true,
          label: "Categoria",
          align: "left",
          field: "category"
        },
        {
          name: "actions",
          label: "Ações",
          align: "right",
          field: "actions"
        }
      ]
    };
  },
  methods: {
    createItem() {
      let data = {
        name: this.form.name,
        price: this.form.price,
        category: this.form.category,
        menu: this.form.menu
      };

      data.category = this.categories.find((category) => {
        console.log(category.name);
        console.log(this.categorySelect);
        return category.name === this.categorySelect;
      });
      data.category = data.category.uuid;

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.VUE_APP_BACKEND_URL}/item/create`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: data
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.getItems();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    formatCurrency() {
      // Update the input value with the formatted currency
      this.form.price = this.form.price.replace(/[^\d.]/g, "");
    },

    getItems() {
      try {
        // Faz uma requisição GET para obter os itens da API
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${process.env.VUE_APP_BACKEND_URL}/item`,
          headers: {
            token: localStorage.getItem("token")
          }
        };

        axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            this.items = response.data;
          })
          .catch((error) => {
            console.log(error);
            if (error.response && error.response.status === 401) {
              // Token inválido ou expirado, redireciona para a tela de login
              this.$router.push('/login')
            }
          });
      } catch (erro) {
        throw erro;
      }
    },
    saveItem() {
      // Faz uma requisição POST ou PUT para salvar o item na API
      if (this.form.uuid) {
        axios
          .put(`/api/items/${this.form.uuid}`, this.form)
          .then(() => {
            this.getItems();
            this.cancelForm();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        axios
          .post("/api/items", this.form)
          .then(() => {
            this.getItems();
            this.cancelForm();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    deleteItem(item) {
      // Faz uma requisição DELETE para remover o item da API
      axios
        .delete(`/api/items/${item.uuid}`)
        .then(() => {
          this.getItems();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    editItem(item) {
      // Preenche o formulário de edição com os dados do item selecionado
      this.form.uuid = item.uuid;
      this.form.name = item.name;
      this.form.price = item.price;
      this.form.category = item.category;
      this.form.menu = item.menu;
      this.showForm = true;
    },
    cancelForm() {
      // Limpa o formulário e fecha o diálogo
      this.form.uuid = "";
      this.form.name = "";
      this.form.price = 0;
      this.form.category = "";
      this.form.menu = false;
      this.showForm = false;
    },

    getCategoryName(categoryId) {
      // Obtém o nome da categoria com base no ID
      // Faz uma requisição GET para obter os dados da categoria na API
      // Você precisa implementar essa função para obter o nome da categoria corretamente
      return "";
    },
    getCategories() {
      // Faz uma requisição GET para obter as categorias da API
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.VUE_APP_BACKEND_URL}/categories`,
        headers: {
          token: localStorage.getItem("token")
        }
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.optionsCategories = response.data.map(
            (category) => category.name
          );
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    formatInput() {
      // Remove all non-digit characters
      let value = this.form.price.replace(/[^\d]/g, "");

      // Check if the value has a decimal separator
      let decimalIndex = value.indexOf(".");

      if (decimalIndex !== -1) {
        // If the decimal separator is present, split the value into integer and decimal parts
        let integerPart = value.substring(0, decimalIndex);
        let decimalPart = value.substring(decimalIndex + 1);

        // Format the integer part with the mask
        integerPart = _.replace(integerPart, /[^0-9.]/g, "");
        // Update the input value with the formatted value
        this.form.price = integerPart + "," + decimalPart;
      } else {
        // If there is no decimal separator, format the entire value with the mask
        value = _.replace(value, /[^0-9.]/g, "");
        this.form.price = value;
      }
    }
  },
  mounted() {
    this.getItems();
    this.getCategories();
  }
};
</script>

<style></style>
