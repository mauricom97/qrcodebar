<template>
  <div>
    <LoginCompany v-if="!loginValid" @login="loginValidity"></LoginCompany>
    <IndexDashboard v-if="loginValid"></IndexDashboard>
  </div>
</template>

<script>
// import { ref } from "vue";
import LoginCompany from "./login/CompanyLogin.vue"
import IndexDashboard from "./dashboard/IndexDashboard.vue"
export default {
  // setup() {
  //   return {
  //     tab: ref("")
  //   };
  // }
  components: {
    LoginCompany,
    IndexDashboard
  },
  data() {
    return {
      loginValid: false
    };
  },
  methods: {
    loginValidity(token) {
      this.loginValid = true;
      localStorage.setItem("token", token);
    }
  }
};
</script>

