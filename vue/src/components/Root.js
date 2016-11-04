export default {
  props: ['message'],
  render(h) {
    let fragment = null;

    if(this.expanded) {
      fragment = (
        <div>
          <h1>
            {this.$slots.default}
          </h1>
          <h2>
            {this.$slots.foo}
          </h2>
        </div>
      );
    }

    return <div>
              <button class="btn btn-primary" on-click={this.toggle}>{this.message}</button>
              {fragment}
            </div>
  },
  computed: {
    expanded() {
      return this.message !== '展开';
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle', !this.expanded);
    }
  }
}
