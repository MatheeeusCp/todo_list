<template>
  <section>
    <h1>Lista de tarefas</h1>

    <!-- Criar um componente para um filtro de busca aqui -->

    <ul>
      <li v-for="(todo, index) in toDoList" :key="index" :class="[todo.done ? 'select' : 'deselect']">
        <div class="todo" @click.prevent="done(todo)">

          <!-- Criar um checkbox que ficará marcado conforme a variável "done" do objeto ToDoItem-->

          <div class="todo-information">
            <span>{{ todo.title }}</span>
            <p>{{ todo.description }}</p>
          </div>
        <div class="actions" @click.stop>

          <!-- Substituir ambos os botões abaixo e utilizar um componente padrão para isso, utilizando $emit para
               realizar a função correta em cada click -->

          <button class="edit" @click="edit(todo, index)" />
          <button class="delete" @click="remove(todo)" />
        </div>
        </div>
      </li>
    </ul>

    <!--  Criar componente de lista vazia para ser exibido -->

    <form @submit.prevent="submit">
      <InputComponent v-model:modelValue="toDoTask.title" text="Digite uma nova tarefa..." label="Título:"/>

      <!--  Criar novo campo "Descrição" para ser informado na tarefa. Utilizar componentização -->

      <ButtonSubmit text="salvar"/>
    </form>
  </section>
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, ref, Ref} from 'vue';
import ToDoItem from "@/entities/ToDoItem";
import {useStore} from "vuex";
import InputComponent from "@/components/inputs/Input.vue";
import ButtonSubmit from "@/components/buttons/ButtonSubmit.vue";

export default defineComponent({
  name: 'CardComponent',
  components: {ButtonSubmit, InputComponent},
  setup() {
    const store = useStore();

    const toDoTask: Ref<ToDoItem> = ref(new ToDoItem());

    const toDoList: ComputedRef<ToDoItem[]> = computed(() => store.getters.todoList);

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
        return;
      }

      if (toDoTask.value.title.length) {
        store.dispatch("setTodoList", toDoTask.value);
        toDoTask.value = new ToDoItem();
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
    }

    const edit = (todo: ToDoItem, index: number) => {
      toDoTask.value.title = todo.title;
      toDoTask.value.description = todo.description;
      isEdit.value = true;
      loadedTodoTask.value = todo;
      loadedIndex.value = index;
    }

    return {
      toDoTask: toDoTask,
      toDoList,
      isEdit,
      search,
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
  padding: 0;
}

li {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 30px;
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
  gap: 20px;
}

.todo > input:hover {
  cursor: pointer;
}

.todo-information {
  display: flex;
  flex-direction: column;
  min-width: 455px;
}

.todo-information  > p {
  margin: 0;
  padding: 0;
  text-align: left;
  color: gray;
}

.todo-information > span {
  text-align: left;
}

</style>
