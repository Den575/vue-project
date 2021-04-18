<template>
  <div>
    <div class="page-title">
      <h3>Dodaj wpis</h3>
    </div>

    <loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      Pusto... <router-link to="/categories">Dodaj nową kategorię</router-link>
    </p>

    <form class="form" v-else @submit.prevent="handleSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
        <label>Wybierz kategorię</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Wpływy</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Wydatek</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        />
        <label for="amount">Kwota</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
        >
          Minimalna wartość wynosi 1
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required
          }"
        />
        <label for="description">Opis</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
        >
          Enter description
        </span>
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
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "record",
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    type: "outcome",
    amount: 1,
    category: null,
    description: ""
  }),
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      } else {
        return this.info.bill >= this.amount;
      }
    }
  },
  methods: {
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          });
          const bill =
            this.type === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;

          await this.$store.dispatch("updateInfo", { bill });
          M.toast({ html: "Dodano wpis!" });
          this.$v.$reset();
          this.amount = 1;
          this.description = "";
        } catch (e) {
          console.log(e);
        }
      } else {
        M.toast({
          html: `Niewystarczająca ilość pieniędzy: -${this.amount -
            this.info.bill}`
        });
      }
    }
  },
  validations: {
    amount: { minValue: minValue(1) },
    description: { required }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;

    this.category = this.categories[0].id;

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy;
    }
  }
};
</script>
