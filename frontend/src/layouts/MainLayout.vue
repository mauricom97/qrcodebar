<template>
  <div class="q-pa-md">
    <q-layout
      view="lHh lpr lFf"
      container
      class="shadow-2 fullscreen rounded-borders background-image"
    >
      <q-header elevated class="bg-purple">
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>

          <q-toolbar-title class="text-h4 q-ma-md">
            Barista <span color="purple">Pro</span>
          </q-toolbar-title>

          <div class="q-gutter-x-md">
            <q-btn
              v-if="!tokenValid"
              label="Login"
              outline
              style="color: rgb(255, 255, 255)"
              @click="this.$router.push('/login')"
            />
            <q-btn
              v-if="!tokenValid"
              label="Cadastrar minha conta"
              outline
              style="color: rgb(255, 255, 255)"
              @click="this.$router.push('/registerCompany')"
            />
            <q-btn
              v-if="tokenValid"
              label="Dashboard"
              outline
              style="color: rgb(255, 255, 255)"
              @click="this.$router.push('/dashborad')"
            />
          </div>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page
          padding
          style="
            background-color: hsla(303, 97%, 28%, 0.705);
            color: rgb(255, 255, 255);
          "
        >
          <div
            class="text-h2 absolute-top absolute-center"
            style="max-width: 50%; text-align: center"
          >
            <div class="text-weight-bolder q-mb-xl">Barista Pro</div>
            <div>
              Cadastre sua empresa e veja tudo o que nossa plataforma pode
              oferecer!
            </div>
            <div>
              <q-btn
                color="purple"
                size="xl"
                label="CADASTRAR MINHA EMPRESA"
                class="q-mt-md"
                @click="this.$router.push('/registerCompany')"
              />
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      words: [
        "Lorem",
        "ipsum",
        "dolor",
        "sit",
        "amet",
        "consectetur",
        "adipisicing",
        "elit",
        "Cum",
        "temporibus",
        "harum",
        "Necessitatibus",
        "natus",
        "facilis",
        "et",
        "nesciunt",
        "itaque",
        "perspiciatis",
        "est",
        "voluptatem",
        "illum",
        "enim",
        "ipsum",
        "blanditiis",
        "Odit",
        "voluptates",
        "est",
        "veritatis",
        "ducimus",
        "nisi"
      ],
      tokenValid: false
    };
  },

  created() {},

  mounted() {
    this.validToken();
  },

  methods: {
    getLayoutLogin() {},
    validToken() {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.VUE_APP_BACKEND_URL}/collaboratorLogin/checkLogin`,
        headers: {
          token:
            localStorage.getItem("token") != null
              ? localStorage.getItem("token")
              : ""
        }
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.tokenValid = response.data.auth;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.background-image {
  background-image: url("../media/baristaproBar.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
