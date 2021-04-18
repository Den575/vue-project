<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title center teal-text login-text"
        >Finance Manager</span
      >
      <p class="card-content center black-text">
        Zestawienie Twoich wydatków i przychodów w jednym miejscu!
      </p>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        <label for="name">Imię</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >Imię wymagane</small
        >
      </div>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email)
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
          >E-mail wymagany</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
          >E-mail powinien mieć postać example@example.com</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength)
          }"
        />
        <label for="password">Hasło</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >Hasło wymagane</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          >Hasło powinno mieć min. 5 znaków. Długość teraz:
          {{ password.length }}</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" required />
          <span>Akceptuję regulamin</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div v-if="!isLoading">
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          onClick="sendMail()"
        >
          Zarejestruj się
          <i class="material-icons right">send</i>
        </button>
      </div>
      <div v-else class="progress">
        <div class="indeterminate"></div>
      </div>
      <p class="center">
        Masz konto?
        <router-link to="/login"
          ><span class="teal-text">Zaloguj się</span></router-link
        >
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  name: "register",
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false,
    isLoading: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(5) },
    name: { required },
    agree: { checked: v => v }
  },
  methods: {
    async submitHandler() {
      this.isLoading = true;
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      };

      await this.$store.dispatch("register", formData);
      this.isLoading = false;
      this.$router.push("/");
    }
  }
};
</script>
