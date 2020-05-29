<template>
  <transition name="fade">
    <div v-show="isShow" class="vc-overlay" id="vueConfirm">
      <transition name="zoom">
        <div
          v-clickoutside="closeDialog"
          v-if="isShow"
          ref="vueConfirm"
          class="vc-container"
          v-on:keyup.esc="closeDialog"
        >
          <span class="vc-text-grid">
            <h4 class="vc-title">{{ title }}</h4>
            <p class="vc-text">{{ message }}</p>
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
          <div
            class="vc-btn-grid"
            :class="{ isMono: !button.no || !button.yes }"
          >
            <button
              v-if="button.no"
              :disabled="isLoading || isConfirmLoading"
              @click="_emit('close')"
              class="vc-btn left"
            >
              {{ button.no }}
            </button>
            <button
              v-if="button.yes"
              :disabled="
                isLoading || isConfirmLoading || isAuth ? !password : false
              "
              @click="saveChanges()"
              class="vc-btn"
            >
              {{ button.yes }}
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'VueConfirmDialog',
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
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    button: {
      type: Object,
      default: function() {
        return { no: 'Cancel', yes: 'Save' }
      }
    }
  },

  data() {
    return {
      password: null,
      isConfirmLoading: false
    }
  },

  methods: {
    _emit(evt, data) {
      this.$root.$emit(evt, data)
    },

    saveChanges() {
      if (this.isAuth && this.password) this._emit('setPassword', this.password)
      this._emit('save', true)
      this.password = null
    },

    closeDialog() {
      this._emit('close')
    }
  }
}
</script>

<style scoped>
@import url('./assets/base.css');
</style>
