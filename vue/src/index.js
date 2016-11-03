import Vue from 'vue';
import Root from './components/Root.vue'
import 'css/scss/index.scss';

window.vm = new Vue({
  el: '#vue-root',
  render: h => h(Root)
});
