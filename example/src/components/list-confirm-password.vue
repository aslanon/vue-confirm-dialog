<template>
  <div class="grid">
    <h3>⚠️ confirm with password</h3>
    <ul>
      <li v-for="item in list" :key="item.id">
        <p>{{ item.text }}</p>
        <button @click="showConfirm(item)">× Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ListConfirmPassword',
  data() {
    return {
      list: [
        {
          text: '👋 Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          id: 4
        },
        {
          text:
            'Adipisci explicabo, odio ullam totam odit tempore optio distinctio vel aliquam officia nam et ex suscipit ratione accusantium minima veniam ipsum laborum. 🎉',
          id: 5
        },
        {
          text:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci explicabo, odio ullam totam odit tempore optio distinctio vel aliquam officia nam et ex suscipit ratione accusantium minima veniam ipsum laborum. 🚀',
          id: 6
        }
      ]
    }
  },
  methods: {
    showConfirm(item) {
      this.$confirm({
        auth: true, // with password confirm
        title: 'Confirm',
        message: `Are you sure? ${item.text} will be remove?`,
        button: {
          no: 'No',
          yes: 'Yes'
        },
        /**
         * Callback
         * @param {Boolean} confirm
         * @param {String} password
         */
        callback: (confirm, password) => {
          if (confirm && password) {
            for (let i = 0; i < this.list.length; i++) {
              if (this.list[i].id == item.id) {
                this.list.splice(i, 1)
                break
              }
            }
          }
        }
      })
    }
  }
}
</script>
