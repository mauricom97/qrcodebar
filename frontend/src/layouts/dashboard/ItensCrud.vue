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
      <q-card>
        <q-card-section>
          <q-form @submit="saveItem">
            <q-input v-model="form.name" label="Nome" />
            <q-input v-model="form.price" label="Preço" type="number" />
            <q-input v-model="form.category" label="Categoria" />
            <q-checkbox v-model="form.menu" label="Menu" />

            <q-card-actions align="right">
              <q-btn color="primary" label="Salvar" type="submit" />
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

export default {
  name: "ItemTable",
  data() {
    return {
      items: [],
      form: {
        uuid: "",
        name: "",
        price: 0,
        category: "",
        menu: false
      },
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
    getItems() {
      // Faz uma requisição GET para obter os itens da API
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.VUE_APP_BACKEND_URL}/item`,
        headers: {
          token:
            localStorage.getItem("token")
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
        });
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
    }
  },
  mounted() {
    this.getItems();
  }
};
</script>

<style></style>
