<template>
  <div>
    <div class="page-title">
      <h3>Profil</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        <label for="description">Imię</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >Please enter name</small
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        WYŚLIJ
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
/*global M*/
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  data: () => ({
    name: "",
  }),
  validations: {
    name: { required },
  },
  mounted() {
    this.name = this.info.name;
    setTimeout(() => {
      M.updateTextFields();
    });
  },
  computed: {
    ...mapGetters(["info"]),
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.updateInfo({
          name: this.name,
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>