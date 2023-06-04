<template>
  <div class="categories">
    <h1>Lista de Categorias</h1>

    <div class="row">
      <div class="col-8">
        <q-btn
          @click="showCreateDialog"
          label="Nova Categoria"
          color="primary"
          class="action-button q-my-md"
        />
      </div>
      <div class="col-4">
        <q-input rounded outlined v-model="text" label="Buscar categoria" />
      </div>
    </div>

    <div class="table-container">
      <table class="q-table" summary="List of categories">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.uuid">
            <td>{{ category.name }}</td>
            <td>
              <q-btn
                @click="editCategory(category)"
                label="Editar"
                color="primary"
                dense
                flat
              />
              <q-btn
                @click="deleteCategory(category)"
                label="Excluir"
                color="negative"
                dense
                flat
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <q-dialog v-model="dialog" @hide="resetForm">
      <q-card>
        <q-card-section>
          <h2 v-if="editing">Editar Categoria</h2>
          <h2 v-else>Criar Categoria</h2>

          <q-input v-model="form.name" label="Nome" />

          <q-card-actions align="right">
            <q-btn
              v-if="editing"
              @click="updateCategory"
              label="Atualizar"
              color="primary"
              class="action-button"
            />
            <q-btn
              v-else
              @click="createCategory"
              label="Criar"
              color="primary"
              class="action-button"
            />
            <q-btn
              @click="dialog = false"
              label="Cancelar"
              color="negative"
              class="action-button"
            />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
      form: {
        name: ""
      },
      editing: false,
      dialog: false
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/categories`,
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );
        this.categories = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async createCategory() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/categories`,
          this.form,
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );
        this.categories.push(response.data);
        this.dialog = false;
        this.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
    showCreateDialog() {
      this.resetForm();
      this.dialog = true;
    },
    editCategory(category) {
      this.form = { ...category };
      this.editing = true;
      this.dialog = true;
    },
    async updateCategory() {
      try {
        const response = await axios.put(
          `${process.env.VUE_APP_BACKEND_URL}/categories/?uuid=${this.form.uuid}`,
          this.form,
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );
        console.log(response.data);
        this.dialog = false;
        this.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteCategory(category) {
      try {
        await axios.delete(
          `${process.env.VUE_APP_BACKEND_URL}/categories/?uuid=${category.uuid}`,
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );
        this.categories = this.categories.filter(
          (c) => c.uuid !== category.uuid
        );
      } catch (error) {
        console.error(error);
      }
    },
    resetForm() {
      this.form = {
        name: ""
      };
      this.editing = false;
    }
  }
};
</script>

<style scoped>
.categories {
  margin: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.q-table {
  border-collapse: separate;
  border-spacing: 0;
}

.action-button {
  margin-left: 8px;
}

.q-dialog {
  max-width: 400px;
  width: 100%;
}
</style>
