<template>
    <div class="q-ma-none q-pa-sm
">
      <div class="column" style="height: 150px">
        <div class="col" color="primary">
            asdasdsad
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false
    };
  },
  methods: {
    login() {
      // Lógica para redirecionar para a página de login
    },
    signup() {
      // Lógica para redirecionar para a página de cadastro
    },
    logout() {
      // Lógica para efetuar logout
      this.isLoggedIn = false;
    }
  }
};
</script>

<style>
.text-white {
  color: white;
}

/* Estilos responsivos */
@media (max-width: 600px) {
  .text-white {
    font-size: 18px;
  }
}
</style>
