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
          >Hasło powinno mieć więcej niż 5 znaków. Długość teraz:
          {{ password.length }}</small
        >
      </div>
    </div>
    <div class="card-action ">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Zaloguj się
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Nie masz konta?
        <router-link to="/register"
          ><span class="teal-text">Zarejestruj się</span></router-link
        >
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  name: "login",
  data: () => ({
    email: "",
    password: ""
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(5) }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password
      };
      try {
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
