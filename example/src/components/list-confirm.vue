<template>
  <div class="grid">
    <h3>⚡️ confirm normal</h3>
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
  name: 'ListConfirm',
  data() {
    return {
      list: [
        {
          text: '🔥 Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          id: 1
        },
        {
          text:
            '🍪 Adipisci explicabo, odio ullam totam odit tempore optio distinctio vel aliquam officia nam et ex suscipit ratione accusantium minima veniam ipsum laborum.',
          id: 2
        },
        {
          text:
            '😎 Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci explicabo, odio ullam totam odit tempore optio distinctio vel aliquam officia nam et ex suscipit ratione accusantium minima veniam ipsum laborum.',
          id: 3
        }
      ]
    }
  },
  methods: {
    showConfirm(item) {
      this.$confirm({
        title: 'Confirm',
        message: `Are you sure? ${item.text} will be remove?`,
        button: {
          yes: 'Yes',
          no: 'Cancel'
        },
        callback: confirm => {
          if (confirm == true) {
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
