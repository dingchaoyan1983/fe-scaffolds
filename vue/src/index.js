import Vue from 'vue';
import Root from './components/Root.vue'
import 'css/scss/index.scss';

window.vm = new Vue({
  el: '#vue-root',
  data(){
    return {
      msg: '我是msg'
    }
  },
  render(createElement) {
    return createElement(Root, {
      props: {
        message: this.msg
      }
    })

  }
});
