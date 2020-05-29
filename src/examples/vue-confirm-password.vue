<template>
  <div class="grid">
    <h3>with password confirm</h3>
    <ul>
      <li v-for="item in list" :key="item.id">
        <span class="item">
          {{ item.text }}
          <button @click="showConfirm(item)">Delete</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VueConfirmPassword',
  data() {
    return {
      list: [
        {
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          id: 4
        },
        {
          text:
            'Adipisci explicabo, odio ullam totam odit tempore optio distinctio vel aliquam officia nam et ex suscipit ratione accusantium minima veniam ipsum laborum.',
          id: 5
        },
        {
          text:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci explicabo, odio ullam totam odit tempore optio distinctio vel aliquam officia nam et ex suscipit ratione accusantium minima veniam ipsum laborum.',
          id: 6
        }
      ]
    }
  },
  methods: {
    showConfirm(item) {
      let self = this
      this.$vueConfirm.confirm(
        {
          title: 'Confirm',
          message: `Are you sure? ${item.text} will be remove?`,
          auth: true, // with password confirm
          button: {
            no: 'No',
            yes: 'Yes'
          }
        },
        /**
         * Callback
         * @param {Boolean} confirm
         */
        function(confirm) {
          if (confirm == true) {
            for (let i = 0; i < self.list.length; i++) {
              if (self.list[i].id == item.id) {
                self.list.splice(i, 1)
                break
              }
            }
          }
        }
      )
    }
  }
}
</script>

<style scoped>
.grid {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.grid h3 {
  text-align: left;
  width: 100%;
  text-transform: capitalize;
}
ul {
  background-color: #ececec;
  border-radius: 0rem;
  border: 1px solid #dfdfdf;
  padding: 0em;
  width: 100%;
  max-width: 720px;
  list-style: none;
}
li {
  text-align: left;
  margin: 0 0;
  padding: 1rem;
  background: white;
  border-bottom: 1px solid #dfdfdf;
}
li:hover {
  background: #ebebeb;
}
.item {
  display: grid;
  grid-template-columns: 1fr 96px;
  width: 100%;
}
.item button {
  height: 30px;
}
</style>
