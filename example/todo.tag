<todo>

  <h3>{ state.title }</h3>

  <ul>
    <li each={ state.items }>
      <label class={ completed: done }>
        <input type="checkbox" checked={ done } onclick={ parent.toggle }> { title }
      </label>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input name="input" onkeyup={ edit }>
    <button disabled={ !text }>Add #{ state.items.length + 1 }</button>
  </form>

  <script>

    this.mixin('redux');
    this.use({title: 'todo.title', items: 'todo.items'});

    edit(e) {
      this.text = e.target.value
    }

    add(e) {
      if (this.text) {
        this.dispatch('add_item', {item: {title: this.text}});
        this.text = this.input.value = ''
      }
    }

    toggle(e) {
      const index = this.state.items.indexOf(e.item);
      this.dispatch('toggle_item_done', {index: index});
      return true
    }

    this.on('mount', function() {
      this.store.trigger('fetch-todo');
    }.bind(this));
    
  </script>

  <style scoped>
    :scope {
      display: block;
      max-width: 400px;
      margin: 20px auto;
    }
  </style>

</todo>
