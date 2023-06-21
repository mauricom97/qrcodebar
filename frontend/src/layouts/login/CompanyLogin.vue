<template>
  <div id="login" class="q-pa-md q-gutter-md">
    <q-card flat bordered class="my-card" style="max-width: 400px; width: 100%">
      <q-card-section>
        <div class="text-h5" style="text-align: center">Login</div>
      </q-card-section>

      <q-card-section>
        <q-input
          filled
          v-model="user"
          label="Usuário"
          lazy-rules
          :rules="[(val) => !!val || 'Campo obrigatório']"
        />
      </q-card-section>

      <q-card-section>
        <q-input
          filled
          v-model="password"
          :type="viewPassword ? 'text' : 'password'"
          label="Senha"
          lazy-rules
          :rules="[(val) => !!val || 'Campo obrigatório']"
          append-icon="passwordFieldType === 'password' ? 'visibility' : 'visibility_off'"
          @click:append="togglePasswordVisibility"
        />
        <small>
          <a href="#">Esqueci minha senha</a>
        </small>
      </q-card-section>

      <q-card-section>
        <q-checkbox
          size="sd"
          v-model="rememberPassword"
          val="sm"
          label="Lembrar a senha"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          color="primary"
          icon="send"
          label="Entrar"
          @click="login"
          :disable="!user || !password"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    return {
      tab: ref("")
    };
  },
  data() {
    return {
      user: "",
      password: "",
      viewPassword: false,
      rememberPassword: false
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    login() {
      let data = JSON.stringify({
        username: this.user,
        password: this.password
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.VUE_APP_BACKEND_URL}/collaboratorLogin/login`,
        headers: {
          "Content-Type": "application/json"
        },
        data: data
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data && response.data.token) {
            localStorage.setItem("token", response.data.token);
            this.$emit("contentDataUser", response.data.user);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
#login {
  background-color: #f5f5f5;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 400px) {
  .my-card {
    max-width: 90%;
  }
}
</style>
