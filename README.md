[![issues](https://badgen.net/github/open-issues/aslanon/vue-confirm-dialog)](https://github.com/aslanon/vue-confirm-dialog/issues) [![npm](https://badgen.net/npm/dt/vue-confirm-dialog)](https://www.npmjs.com/package/vue-confirm-dialog) [![npm version](https://badge.fury.io/js/vue-confirm-dialog.svg)](https://www.npmjs.com/package/vue-confirm-dialog) [![license](https://badgen.net/github/license/aslanon/vue-confirm-dialog)](https://github.com/aslanon/vue-confirm-dialog/blob/master/LICENSE)

# vue-confirm-dialog

Simple Confirm Dialog verification plugin with Vue.js.

Demo: https://aslanon.github.io/vue-confirm-dialog/

![confirm-dialog](https://raw.githubusercontent.com/aslanon/vue-confirm-dialog/master/example/src/static/confirm-dialog.png)

![vue-confirm](https://media.giphy.com/media/KzDUV51RkigyVBsJgA/giphy.gif)

## Install

```bash
$ npm install --save vue-confirm-dialog
```

## Quick Start Usage

In main.js or plugin (for Nuxt.js):

```js
import Vue from 'vue'
import VueConfirmDialog from 'vue-confirm-dialog'

Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
```

In App.vue (or in the template file for Nuxt.js (layout/default.vue)):

```html
<template>
  <div id="app">
    <vue-confirm-dialog></vue-confirm-dialog>
    <!-- your code -->
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>
```

In any of functions :

```js
methods: {
    handleClick(){
      this.$confirm(
        {
          message: 'Are you sure?',
          button: {
            no: 'No',
            yes: 'Yes'
          },
          /**
          * Callback Function
          * @param {Boolean} confirm
          */
          callback: confirm => {
            if (confirm) {
              // ... do something
            }
          }
        }
      )
    }
  }
```

If you want to use in \*.js file (e.g Vuex Store) before import Vue and after use Vue.\$confirm.

```js
import Vue from 'vue'

export default {
  namespaced: true,
  state: {},
  actions: {
    logout({ commit }) {
      Vue.$confirm({
        title: 'Are you sure?',
        message: 'Are you sure you want to logout?',
        button: {
          yes: 'Yes',
          no: 'Cancel'
        },
        callback: confirm => {
          // ...do something
        }
      })
    }
  }
}
```

## API

If you want to password confirm, "auth" key is must be true.

```js
this.$confirm({
  auth: true,
  message: 'foo',
  button: {
    yes: 'Yes',
    no: 'Cancel'
  },
  /**
   * Callback Function
   * @param {Boolean} confirm
   * @param {String} password
   */
  callback: (confirm, password) => {
    if (confirm && password == YOUR_PASSWORD) {
      // ...do something
    }
  }
})
```

## Use only for information

If you want to use only for information and you want of see one button in dialog, you can use only one of 'no' or 'yes' button object.

![vue-confirm](https://media.giphy.com/media/U3y0rmoC4SUySJxJqL/giphy.gif)

```js
methods: {
    handleClick(){
      this.$confirm(
        {
          title: 'Information',
          message: 'This content has been removed',
          button: {
          	yes: 'OK',
          }
        },
        /**
        * Callback Function
        * @param {Boolean} confirm
        */
        callback: confirm => {
          if (confirm) {
            // ... do something
          }
        }
      )
    }
  }
```
