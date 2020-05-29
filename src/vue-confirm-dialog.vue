<template>
  <transition name="fade">
    <div v-if="isShow" @click="closeDialog" class="vc-overlay" id="vueConfirm">
      <transition name="zoom">
        <div
          v-if="isShow"
          @keyup.esc="closeDialog"
          ref="vueConfirm"
          class="vc-container"
        >
          <span class="vc-text-grid">
            <h4 v-if="title" class="vc-title">{{ title }}</h4>
            <p v-if="message" class="vc-text">{{ message }}</p>
            <span v-if="isAuth">
              <input
                v-focus
                v-model="password"
                @keyup.13="saveChanges"
                class="vc-input"
                type="password"
                name="vc-password"
                placeholder="Password"
              />
            </span>
          </span>
          <div
            class="vc-btn-grid"
            :class="{ isMono: !button.no || !button.yes }"
          >
            <button
              v-if="button.no"
              @click="_emit('close')"
              :disabled="isLoading || isConfirmLoading"
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
      default: () => {}
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

    closeDialog(e) {
      if (e.target.id != 'vueConfirm') return
      this._emit('close')
    },

    saveChanges() {
      if (this.isAuth && this.password) this._emit('setPassword', this.password)
      this._emit('save', true)
      this.password = null
    }
  }
}
</script>

<style scoped>
@import url('./assets/base.css');
</style>
