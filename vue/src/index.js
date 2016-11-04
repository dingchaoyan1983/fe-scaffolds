import Vue from 'vue';
import Root from './components/Root';
import 'css/scss/index.scss';

window.vm = new Vue({
  el: '#vue-root',
  data() {
    return {
      msg: '展开',
      defaultSlot: '我是default的slot',
      switch: true
    }
  },
  render(h) {
    return <div>
      {this.switch
        ? <Root message={this.$data.msg} on-toggle={this.toggle}>
            <div>{this.defaultSlot}</div>
            <div slot="foo">我是命名的slot</div>
          </Root>
        : <div>这个是switch</div>}
    </div>;
  },

  methods: {
    toggle(expanded) {
      if(expanded) {
        this.msg = '关闭';
      } else {
        this.msg = '展开';
      }
    }
  }
});
