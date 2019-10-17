<template>
  <transition name="fade">
    <div v-show="isShow" class="vc-overlay" id="vueConfirm">
      <transition name="zoom">
        <div v-if="isShow" ref="vueConfirm" class="vc-container"  v-on:keyup.esc="closeDialog">
          <span class="vc-text-grid">
            <h4 class="vc-title">{{title}}</h4>
            <p class="vc-text">{{message}}</p>
            <span v-if="isAuth">
              <input
                v-focus
                class="vc-input"
                name="vc-password"
                placeholder="Password"
                type="password"
                v-model="password"
                v-on:keyup.13="saveChanges"
              />
            </span>
          </span>
          <div class="vc-btn-grid" :class="{'isMono': !button.no || !button.yes}">
            <button
              v-if="button.no"
              :disabled="isLoading  || isConfirmLoading"
              @click.stop="_emit('close')"
              class="vc-btn left"
            >{{button.no}}</button>
            <button
              v-if="button.yes"
              :disabled="isLoading  || isConfirmLoading || isAuth ? !password : false"
              @click.stop="saveChanges()"
              class="vc-btn"
            >{{button.yes}}</button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
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
    title: {
      type: String,
      default: "Confirm"
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
      } catch (error) {
        // console.log(error)
      }
    },

    saveChanges() {
      if (this.isAuth && this.password)
        this._emit("setPassword", this.password);
      this._emit("save", true);
      this.password = null;
    },

    closeDialog(){
       this._emit("close");
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
@import url("./assets/transition.css");

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
  margin: 0;
  padding: 0;
}
.vc-title {
  color: black !important;
  padding: 0 1rem !important;
  width: 100% !important;
  font-weight: 900 !important;
  text-align: center !important;
  font-size: 16px !important;
  line-height: initial !important;
  margin-bottom: 5px !important;
}
.vc-text {
  color: black !important;
  padding: 0 1rem !important;
  width: 100% !important;
  font-weight: 500 !important;
  text-align: center !important;
  font-size: 14px !important;
  line-height: initial !important;
}
.border-top {
  border-top: 1px solid rgb(224, 224, 224);
}
.vc-overlay {
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
.vc-container {
  background: white;
  border-radius: 1rem;
  width: 286px;
  height: auto;
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: rgba(0, 0, 0, 0.29) 0px 3px 8px 0px;
}

.vc-text-grid {
  padding: 1rem;
}
.vc-btn-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 50px;
  border-radius: 0 0 1rem 1rem;
  overflow: hidden;
}
.vc-btn-grid.isMono {
  grid-template-columns: 1fr;
}
.vc-btn {
  border-radius: 0 0 1rem 0;
  color: cornflowerblue;
  background: white;
  border: 0;
  font-size: 1rem;
  border-top: 1px solid rgb(224, 224, 224);
  cursor: pointer;
  font-weight: 700;
  outline: none;
}
.vc-btn:hover {
  background: whitesmoke;
}
.vc-btn:disabled {
  background: whitesmoke;
}
.vc-btn:active {
  box-shadow: inset 0 2px 0px 0px #00000014;
}
.vc-btn.left {
  border-radius: 0;
  /* color: black; */
  border-right: 1px solid #e0e0e0;
}
.vc-input[type="password"] {
  width: 100%;
  outline: none;
  border-radius: 8px;
  height: 35px;
  border: 0;
  margin:5px 0;
  background-color: #ebebeb;
  padding: 0 0.5rem;
  font-size: 16px;
  transition: 0.21s ease;
}
.vc-input[type="password"]:hover,
.vc-input[type="password"]:focus {
  background-color: #dfdfdf;
}
</style>