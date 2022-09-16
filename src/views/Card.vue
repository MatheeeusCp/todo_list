<template>
  <section>
    <h1>Lista de tarefas</h1>
    <SearchComponent @modelValue="searchToDo($event)" text="Buscar tarefa" label="Busca"/>
    <ul v-if="filteredList.length > 0">
      <li v-for="(todo, index) in filteredList" :key="index" :class="[todo.done ? 'select' : 'deselect']">
        <div class="todo" @click.prevent="done(todo)">
          <div class="todo-information">
            <input type="checkbox" :checked="todo.done">
            <div class="todo-details">
              <span>{{ todo.title }}</span>
              <p>{{ todo.description }}</p>
            </div>
          </div>
          <div class="actions" @click.stop>
            <ButtonItemOption class="edit" @clicked="edit(todo, index)"></ButtonItemOption>
            <ButtonItemOption class="delete" @clicked="remove(todo)"></ButtonItemOption>
          </div>
        </div>
      </li>
    </ul>
    <EmptyList v-else></EmptyList>
    <form @submit.prevent="submit">
      <InputComponent v-model:modelValue="toDoTask.title" text="Digite uma nova tarefa..." label="Título:"/>
      <InputComponent v-model:modelValue="toDoTask.description" text="Digite a descrição..." label="Descrição:"/>
      <ButtonSubmit text="salvar"/>
    </form>
  </section>
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, ref, Ref} from 'vue';
import ToDoItem from "../entities/ToDoItem";
import {useStore} from "vuex";
import InputComponent from "../components/inputs/Input.vue";
import ButtonSubmit from "../components/buttons/ButtonSubmit.vue";
import SearchComponent from "../components/inputs/Search.vue";
import EmptyList from "../components/EmptyList.vue";
import ButtonItemOption from "../components/buttons/ButtonItemOption.vue";

export default defineComponent({
  name: 'CardComponent',
  components: {ButtonItemOption: ButtonItemOption, EmptyList, SearchComponent, ButtonSubmit, InputComponent},
  setup() {
    const store = useStore();

    const toDoTask: Ref<ToDoItem> = ref(new ToDoItem());

    const toDoList: ComputedRef<ToDoItem[]> = computed(() => store.getters.todoList);

    const filteredList: Ref<ToDoItem[]> = ref([]);

    const isEdit: Ref<boolean> = ref(false);

    const search: Ref<string> = ref('')

    const loadedTodoTask: Ref<ToDoItem | null> = ref(null);

    const loadedIndex: Ref<number | null> = ref(null);

    const submit = () => {
      if (loadedTodoTask.value) {
        const todoToUpdate = new ToDoItem(
            toDoTask.value.title,
            loadedTodoTask.value.done,
            toDoTask.value.description,
        )
        store.dispatch("editTodoList", {todo: todoToUpdate, indexToUpdate: loadedIndex.value});
        isEdit.value = false;
        loadedTodoTask.value = null;
        toDoTask.value = new ToDoItem();

        loadFiltered();
        return;
      }

      if (toDoTask.value.title.length) {
        store.dispatch("setTodoList", toDoTask.value);
        toDoTask.value = new ToDoItem();

        loadFiltered();
      } else {
        alert("O texto da tarefa é obrigatório!")
      }
    }

    const done = (todo: ToDoItem) => {
      todo.done = !todo.done;
    }

    const remove = (todo: ToDoItem) => {
      toDoTask.value = new ToDoItem();
      store.dispatch("clearTodoList",todo);

      loadFiltered();
    }

    const edit = (todo: ToDoItem, index: number) => {
      toDoTask.value.title = todo.title;
      toDoTask.value.description = todo.description;
      isEdit.value = true;
      loadedTodoTask.value = todo;
      loadedIndex.value = index;
    }

    const searchToDo = (value: string) => {
      search.value = value;

      if (value.trim().length == 0) {
        filteredList.value.splice(0)
        filteredList.value.push(...toDoList.value);
        return;
      }

      const list = toDoList.value.filter((it: ToDoItem) => {
        return it.title.toLowerCase().startsWith(value.toLowerCase());
      });

      filteredList.value.splice(0);
      filteredList.value.push(...list);
    }

    const loadFiltered = () => {
      filteredList.value.splice(0);
      filteredList.value.push(...toDoList.value);

      searchToDo(search.value);
    }

    return {
      toDoTask: toDoTask,
      toDoList,
      isEdit,
      search,
      filteredList,
      searchToDo,
      submit,
      done,
      remove,
      edit,
    }
  }
});
</script>

<style scoped>
section {
  width: 45%;
  background-color: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 20px;
}

h1 {
  text-transform: uppercase;
  font-weight: 100;
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
}

.select {
  text-decoration: line-through
}

.deselect {
  text-decoration: initial;
}

.select:hover, .deselect:hover {
  cursor: pointer;
}

ul {
  gap: 10px;
  padding: 0;
  margin: 0;
  width: 100%;
}

li {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
}

.actions {
  display: flex;
}

.actions > button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.actions > button:hover {
  background-color: #efefef;
  border-radius: 10px;
}

.delete::after {
  content: "";
  background-image: url("../assets/ep_delete.svg");
  width: 24px;
  height: 24px;
}

.edit, .delete {
  display: flex;
  background-color: transparent;
  height: 35px;
  border: none;
}

.edit:hover, .delete:hover {
  cursor: pointer;
}

.edit::after {
  content: "";
  background-image: url("../assets/akar-icons_edit.svg");
  width: 24px;
  height: 24px;
}

.todo {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
}

.todo > input:hover {
  cursor: pointer;
}

.todo-information {
  display: flex;
  min-width: 100px;
  gap: 10px;
}

.todo-information  > p {
  margin: 0;
  padding: 0;
  text-align: left;
  color: gray;
}

.todo-details > span {
  text-align: left;
}

.todo-details{
  display: flex;
  flex-direction: column;
}

.todo-details > p {
  margin: 0;
  padding: 0;
  text-align: left;
  color: gray;
}


@media only screen and (max-width: 1100px) {

  .todo-information {
    min-width: 100px;
    gap: 10px;
  }
  .todo-details{
    flex-direction: column;
  }

}
</style>
