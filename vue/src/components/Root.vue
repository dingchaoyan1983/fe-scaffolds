<template>
  <div>
    {{message}}
  </div>
</template>

<script>
  export default {
    props: ['message'],
    beforeCreate() {
      console.log(this._uid);
      console.log('beforeCreate');
    },
    created() {
      console.log(this._uid);
      console.log('created');
    },
    beforeMount() {
      console.log(this._uid);
      console.log('beforeMount');
    },
    mounted() {
      console.log(this._uid);
      console.log('mounted');
    },
    beforeUpdate() {
      console.log(this._uid);
      console.log('beforeUpdate');
    },
    updated() {
      console.log(this._uid);
      console.log('updated');
    },
    beforeDestroy() {
      console.log(this._uid);
      console.log('beforeDestroy');
    },
    destroyed() {
      console.log(this._uid);
      console.log('destroyed');
    }
  }
</script>
