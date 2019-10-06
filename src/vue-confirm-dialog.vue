<template>
  <div v-if="isShow" class="vue-confirm-dialog-overlay">
    <div ref="vueConfirm" class="vue-confirm-dialog-container">
      <p>{{message}}</p>

      <span v-if="isAuth" style="padding: 1rem; padding-top:0">
        <input
          style="position:absolute;left: 0;top:0;width:0;padding:0;opacity:0"
          name="confirm-password"
          type="search"
        />
        <input
          v-focus
          class="input-type-text --fill-gray"
          size="14"
          max-width="full"
          radius="8"
          height="35"
          name="confirm-password"
          placeholder="******"
          type="password"
          v-model="password"
        />
      </span>

      <div class="vue-confirm-dialog-button-grid">
        <button
          :disabled="isLoading  || isConfirmLoading"
          @click.stop="_emit('close')"
          class="vue-confirm-dialog-button left"
        >{{button.no}}</button>

        <button
          :disabled="isLoading  || isConfirmLoading"
          @click.stop="saveChanges()"
          class="vue-confirm-dialog-button"
        >{{button.yes}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VueConfirm",
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isAuth: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: "Are you sure?"
    },
    button: {
      type: Object,
      default: function() {
        return { no: "Cancel", yes: "Save" };
      }
    }
  },

  data() {
    return {
      password: null,
      isConfirmLoading: false
    };
  },

  methods: {
    _emit(evt, data) {
      this.$root.$emit(evt, data);
    },

    documentClick(e) {
      try {
        let el = this.$refs.vueConfirm;
        let target = e.target;
        if (el !== target && !el.contains(target)) {
          this._emit("close");
        }
      } catch (error) {}
    },

    saveChanges() {
      if (!this.isAuth) this._emit("save", true);
    }
  },

  beforeDestroy() {
    document.removeEventListener("click", this.documentClick);
  },

  beforeMount() {
    document.addEventListener("click", this.documentClick);
  }
};
</script>

<style scoped>
*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-decoration: none;
  /* -webkit-tap-highlight-color: rgba(0,0,0,0); */
  -webkit-touch-callout: none;
  /* -webkit-font-smoothing: antialiased; */
  -moz-osx-font-smoothing: grayscale;
}
.vue-confirm-dialog-overlay {
  background: rgba(0, 0, 0, 0.29);
  width: 100%;
  height: 100%;
  transition: all 0.1s ease-in;
  left: 0;
  top: 0;
  z-index: 999999999999;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: baseline;
}
.vue-confirm-dialog-container {
  background: white;
  border-radius: 1rem;
  width: 336px;
  height: auto;
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: rgba(0, 0, 0, 0.29) 0px 3px 8px 0px;
}
p {
  color: black;
  padding: 2rem;
  width: 100%;
  font-weight: 700;
  text-align: center;
}
.vue-confirm-dialog-button-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 50px;
  border-radius: 0 0 1rem 1rem;
  overflow: hidden;
}
.vue-confirm-dialog-button {
  border-radius: 0 0 1rem 0;
  color: cornflowerblue;
  background: white;
  border: 0;
  border-top: 1px solid rgb(224, 224, 224);
  cursor: pointer;
  font-weight: 700;
  outline: none;
}
.vue-confirm-dialog-button:hover {
  background: whitesmoke;
}
.vue-confirm-dialog-button:disabled {
  background: whitesmoke;
}
.vue-confirm-dialog-button:active {
  box-shadow: inset 0 2px 0px 0px #00000014;
}
.vue-confirm-dialog-button.left {
  border-radius: 0;
  color: black;
  border-right: 1px solid rgb(224, 224, 224);
}
.border-top {
  border-top: 1px solid rgb(224, 224, 224);
}
</style>