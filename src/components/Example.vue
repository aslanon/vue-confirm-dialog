<template>
  <div class="grid">
    <ul>
      <li v-for="(item, i) in list" :key="item.id">
        <span class="item">
          {{item.text}}
          <button @click.stop="showConfirm(item)">Delete</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Example",
  data() {
    return {
      list: [
        { text: "item 1", id: 1 },
        { text: "item 2", id: 2 },
        { text: "item 3", id: 3 }
      ]
    };
  },
  methods: {
    showConfirm(item) {
      let self = this;
      this.$vueConfirm.confirm(
        {
          message: `Are you sure? ${item.text} will be remove?`,
          auth: true, // with password confirm
          button: {
            no: "No",
            yes: "Yes"
          }
        },
        /**
         * Callback
         * @param {Boolean} confirm
         * @param {String} password
         */
        function(confirm, password) {
          if (confirm == true) {
            for (let i = 0; i < self.list.length; i++) {
              if (self.list[i].id == item.id) {
                self.list.splice(i, 1);
                self.$vueConfirm.close();
                break;
              }
            }
          }
        }
      );
    }
  }
};
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
ul {
  border: 1px solid gray;
  padding: 1rem 2rem;
  width: 200px;
}
li {
  text-align: left;
  margin: 0.5rem 0;
}
.item {
  display: grid;
  grid-template-columns: 1fr 96px;
  width: 100%;
}
</style>
