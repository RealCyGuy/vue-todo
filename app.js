function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

var vm = new Vue({
  el: "#app",
  data: {
    input: "",
    todos: [],
    placeholders: shuffle([
      "Wash dishes...",
      "Wash the car...",
      "Caramalize the apples...",
      "Mow the lawn...",
      "Take out the trash...",
      "Do the thing...",
      "Bake a cake...",
      "Buy birthday present...",
      "Vacuum the 14th floor...",
      "Contemplate my life decisions...",
      "Finish chicken noodle soup...",
      "Remove cat from toaster...",
      "Deliver the French-English dictionary...",
      "Return borrowed pen from John...",
      "Prepare for phase 3...",
      "Finish homework...",
      "Paint painting...",
      "Check email...",
      "Close the binder...",
      "Ask for highlighter back, politely...",
      "Calculate 3457th digit of pi...",
      "Fix the leaking doorknob...",
      "Finish todos...",
      "Share this to everyone...",
      "Paint fence...",
      "Store away used photo albums...",
      "Be productive...",
      "Finish chapter 17...",
      "Edit popcorn video...",
      "Squeeze orange juice...",
      "Study for biology exam...",
      "Drink remaining paint...",
      "Print pages 325-738...",
      "Fill out questionaire...",
      "Mash potatoes...",
      "Profit...",
      "Present duck presentation...",
      "Redo the doing do...",
      "Alphabetize the business cards...",
      "Design revision 7...",
      "Respread the cream cheese...",
      "Sort pineapples...",
      "Melt the cheeses...",
      "Memorize part 4...",
      "Survey 12 more people...",
      "Ask for peanut butter...",
      "Taste the salt...",
      "Microwave the lasagne...",
      "Clean water bottles...",
      "Drink 8 glasses of water...",
      "Run around the block...",
      "Rebuild site A...",
      "Reinvent the wheel...",
      "Manipulate dice rolls...",
      "Read terms of service...",
      "Get the source at https://github.com/realcyguy/vue-todo...",
      "Speak up about Eggplants x Penguins...",
      "Brainstorm pencil ideas..."
    ]),
  },
  methods: {
    addTodo() {
      const newTodo = {
        id: uuidv4(),
        text: this.input ? this.input : this.placeholders[0],
        completed: false,
      };

      this.todos.unshift(newTodo);
      this.input = "";
      this.placeholders.push(this.placeholders.shift());
    },
    removeTodo(todoId) {
      this.todos = this.todos.filter((todo) => todo.id !== todoId);
    },
    toggleTodo(todoId) {
      for (index = 0; index < this.todos.length; index++) {
        if (this.todos[index].id == todoId) {
          this.todos[index].completed = !this.todos[index].completed;
        }
      }
    },
    removeAll() {
      if (this.todos.length) {
        if (confirm("Are you sure you want to remove all todos?")) {
          this.todos = [];
        }
      }
    },
    removeCompleted() {
      if (confirm("Are you sure you want to remove all completed todos?")) {
        var i = this.todos.length;
        while (i--) {
          if (this.todos[i].completed) {
            this.todos.splice(i, 1);
          }
        }
      }
    },
  },
  mounted() {
    if (localStorage.todos) {
      this.todos = JSON.parse(localStorage.todos);
    }
  },
  watch: {
    todos: {
      deep: true,

      handler(newtodo) {
        localStorage.todos = JSON.stringify(newtodo);
      },
    },
  },
});

Vue.component("todo-item", {
  props: ["todo"],
  template: `
    <li class="todo-item">
      <p @click="$emit('toggle-todo', todo.id)" :class="{completed: todo.completed}">{{ todo.text }}</p>
      <span class="material-icons" @click="$emit('remove-todo', todo.id)">delete</span>
    </li>
  `,
});
