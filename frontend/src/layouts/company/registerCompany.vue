<template>
  <div class="q-pa-md absolute-center">
    <q-card flat bordered class="my-card" style="min-width: 300px">
      <q-carousel animated v-model="slide" style="height: 85vh">
        <q-carousel-slide :name="1">
          <q-card-section>
            <div class="text-h6">Informações da empresa</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              outlined
              class="q-mb-sm"
              v-model="company.cnpj"
              label="CNPJ"
              mask="##.###.###/####-##"
            />
            <q-input
              outlined
              class="q-mb-sm"
              v-model="company.razaoSocial"
              label="Razão Social"
            />
            <q-input
              outlined
              class="q-mb-sm"
              v-model="company.nomeFantasia"
              label="Nome Fantasia"
            />
            <q-input
              outlined
              class="q-mb-sm"
              v-model="company.stateRegistration"
              label="Inscrição Estadual"
            />
          </q-card-section>
        </q-carousel-slide>
        <q-carousel-slide :name="2">
          <q-card-section>
            <div class="text-h6">Endereço da empresa</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input
              outlined
              class="q-mb-sm"
              v-model="company.state"
              label="Estado"
            />
            <q-input
              outlined
              class="q-mb-sm"
              v-model="company.city"
              label="Cidade"
            />
            <q-input
              outlined
              class="q-mb-sm"
              v-model="company.neighborhood"
              label="Bairro"
            />
            <q-input
              outlined
              class="q-mb-sm"
              v-model="company.address"
              label="Endereço"
            />
          </q-card-section>
        </q-carousel-slide>
        <q-carousel-slide :name="3">
          <q-card-section>
            <div class="text-h6">Contatos da empresa</div>
          </q-card-section>
          <q-input
            outlined
            class="q-mb-sm"
            v-model="company.phone"
            label="Telefone"
          />
          <q-input
            outlined
            class="q-mb-sm"
            v-model="company.email"
            label="E-mail"
          />
        </q-carousel-slide>
        <q-carousel-slide :name="4">
          <div class="absolute-center">
            <q-spinner-grid
              color="primary"
              v-if="!successRegisterCompany && !showInfoCreateAccount"
              size="2em"
            />
            <img
              style="max-width: 300px"
              v-if="successRegisterCompany"
              src="../../media/coffe.png"
              alt=""
            />
            <div
              class="text-h6"
              style="text-align: center"
              v-if="successRegisterCompany"
            >
              Empresa cadastrada com sucesso!
            </div>
            <img
              style="max-width: 300px"
              v-if="showInfoCreateAccount"
              src="../../media/createAccount.png"
              alt=""
            />
            <div
              class="text-h6 q-ma-md"
              style="text-align: center"
              v-if="showInfoCreateAccount"
            >
              Agora vamos criar a sua conta...
            </div>
            <div
              style="
                align-items: center;
                text-align: center;
                justify-content: center;
              "
            >
              <q-spinner-grid
                color="primary"
                v-if="showInfoCreateAccount"
                size="2em"
                class="absolute-center-bottom"
              />
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="5">
          <q-card-section>
            <div class="text-h6">Informações do usuario</div>
          </q-card-section>
          <q-input
            outlined
            class="q-mb-sm"
            v-model="newUser.firstname"
            label="Primeiro nome"
          />
          <q-input
            outlined
            class="q-mb-sm"
            v-model="newUser.lastname"
            label="Segundo nome"
          />
          <q-input
            outlined
            class="q-mb-sm"
            v-model="newUser.birthday"
            mask="##/##/####"
            label="Data Nascimento"
          />
          <q-input
            outlined
            class="q-mb-sm"
            v-model="newUser.email"
            label="E-mail"
          />
          <q-input
            outlined
            class="q-mb-sm"
            v-model="newUser.phone"
            mask="(##) ####-#####"
            label="Telefone"
          />
        </q-carousel-slide>
        <q-carousel-slide :name="6">
          <q-card-section>
            <div class="text-h6">Informações de acesso</div>
          </q-card-section>
          <q-input
            outlined
            class="q-mb-sm"
            v-model="newUser.username"
            label="Nome de usuário"
          />
          <q-input
            outlined
            class="q-mb-sm"
            type="password"
            v-model="newUser.password"
            label="Senha"
          />
          <q-input
            outlined
            class="q-mb-sm"
            type="password"
            v-model="newUser.confirmPassword"
            label="Confirme a senha"
          />
        </q-carousel-slide>
      </q-carousel>
      <q-card-section>
        <div style="align-items: center">
          <q-icon
            v-if="slide < 3 || (slide >= 5 && slide < 6)"
            @click="incrementSlide()"
            class="absolute-bottom-right q-ma-md"
            name="arrow_forward_ios"
            size="3em"
          />
          <q-icon
            v-if="(slide > 1 && slide < 4) || slide > 5"
            @click="slide = slide - 1"
            class="absolute-bottom-left q-ma-md"
            name="arrow_back_ios"
            size="3em"
          />
          <q-icon
            v-if="slide === 3"
            @click="registerCompany()"
            class="absolute-bottom-right q-ma-md"
            name="check"
            size="3em"
          />
          <q-icon
            v-if="slide === 6"
            @click="registerNewLogin()"
            class="absolute-bottom-right q-ma-md"
            name="check"
            size="3em"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import moment from "moment";
export default {
  setup() {
    return {
      slide: ref(1)
    };
  },
  data() {
    return {
      company: {
        cnpj: "",
        stateRegistration: "",
        razaoSocial: "",
        nomeFantasia: "",
        phone: "",
        email: "",
        state: "",
        city: "",
        neighborhood: "",
        address: ""
      },
      successRegisterCompany: false,
      uuidNewCompany: "",
      showInfoCreateAccount: false,
      newUser: {
        firstname: "",
        lastname: "",
        birthday: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: "",
        collaborator_uuid: ""
      }
    };
  },

  methods: {
    incrementSlide() {
      this.slide = this.slide + 1;
      if (this.slide === 6) {
        this.registerNewPerson();
      }
    },
    registerNewLogin() {
      let data = {
        username: this.newUser.username,
        password: this.newUser.password,
        collaborator_uuid: this.newUser.collaborator_uuid,
        company_uuid: this.uuidNewCompany
      };

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        // url: "http://localhost:3006/collaboratorLogin/create",
        url: `${process.env.VUE_APP_BACKEND_URL}/collaboratorLogin/create`,
        headers: {},
        data: data
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    registerCompany() {
      this.slide = 4;
      let data = {
        cnpj: this.company.cnpj,
        stateRegistration: this.company.stateRegistration,
        razaoSocial: this.company.razaoSocial,
        nomeFantasia: this.company.nomeFantasia,
        phone: this.company.phone,
        email: this.company.email,
        state: this.company.state,
        city: this.company.city,
        neighborhood: this.company.neighborhood,
        address: this.company.address
      };
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        // url: "http://localhost:3006/company/create",
        url: `${process.env.VUE_APP_BACKEND_URL}/company/create`,
        headers: {},
        data: data
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.uuidNewCompany = response.data.uuid;
          setTimeout(() => {
            this.successRegisterCompany = true;
          }, 1000);
          setTimeout(() => {
            this.successRegisterCompany = false;
            this.showInfoCreateAccount = true;
          }, 4000);
          setTimeout(() => {
            this.successRegisterCompany = false;
            this.showInfoCreateAccount = false;
            this.slide = 5;
          }, 6000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    registerNewPerson() {
      let data = JSON.stringify({
        firstName: this.newUser.firstname,
        lastName: this.newUser.lastname,
        email: this.newUser.email,
        phone: this.newUser.phone,
        birthday: moment(this.newUser.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        type: 1
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        // url: "http://localhost:3006/collaborator/create",
        url: `${process.env.VUE_APP_BACKEND_URL}/collaborator/create`,
        headers: {
          "Content-Type": "application/json"
        },
        data: data
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.newUser.collaborator_uuid = response.data.uuid;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>
