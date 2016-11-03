import Vue from 'vue';
import Root from './components/Root.vue'
import 'css/scss/index.scss';

window.vm = new Vue({
  el: '#vue-root',
  data(){
    return {
      msg: '我是msg',
      switch: true
    }
  },
  render(h) {
    return <div>
              {this.switch ? <Root message={this.msg}/> : <div>这个是switch</div>}
           </div>;
  }
});
