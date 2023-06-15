<template>
  <div>
    <IndexDashboard></IndexDashboard>
    <!-- <IndexLP></IndexLP> -->
  </div>
</template>

<script>
// import { ref } from "vue";
// import LoginCompany from "./login/CompanyLogin.vue"
import IndexDashboard from "./dashboard/IndexDashboard.vue"
// import IndexLP from "./LearningPage/IndexLP.vue"
export default {
  // setup() {
  //   return {
  //     tab: ref("")
  //   };
  // }
  components: {
    // LoginCompany,
    IndexDashboard
    // IndexLP
  },
  data() {
    return {
    };
  },

  created() {
  },

  methods: {
    // loginValidity(token) {
    //   this.loginValid = true;
    //   localStorage.setItem("token", token);
    // }
  }
};
</script>

