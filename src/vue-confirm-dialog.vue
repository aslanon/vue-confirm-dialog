<template>
  <transition name="fade">
    <div v-show="isShow" class="vc-overlay" id="vueConfirm">
      <transition name="zoom">
        <div
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
              @click.stop="_emit('close')"
              class="vc-btn left"
            >
              {{ button.no }}
            </button>
            <button
              v-if="button.yes"
              :disabled="
                isLoading || isConfirmLoading || isAuth ? !password : false
              "
              @click.stop="saveChanges()"
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
  name: 'VueConfirm',
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
      default: 'Confirm'
    },
    message: {
      type: String,
      default: 'Are you sure?'
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

    documentClick(e) {
      try {
        let el = this.$refs.vueConfirm
        let target = e.target
        if (el !== target && !el.contains(target)) {
          this._emit('close')
        }
      } catch (error) {
        // console.log(error)
      }
    },

    saveChanges() {
      if (this.isAuth && this.password) this._emit('setPassword', this.password)
      this._emit('save', true)
      this.password = null
    },

    closeDialog() {
      this._emit('close')
    }
  },

  beforeDestroy() {
    document.removeEventListener('click', this.documentClick)
    document.removeEventListener('touchstart', this.documentClick)
  },

  beforeMount() {
    document.addEventListener('click', this.documentClick)
    document.addEventListener('touchstart', this.documentClick)
  }
}
</script>

<style scoped>
@import url('./assets/base.css');
</style>
