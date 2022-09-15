import { createStore } from 'vuex'
import ToDoItem from "../entities/ToDoItem";

export class VueState {
  todoList: ToDoItem[] = [];
}
export default createStore({
  state: new VueState(),

  mutations: {
    SET_TODO_LIST(state: VueState, todoList: ToDoItem) {
      state.todoList.push(todoList);
    },
    SET_TODOS_LIST(state: VueState, todos: ToDoItem[]) {
      state.todoList = todos;
    },
    CLEAR_TODO_LIST(state: VueState, todoList: ToDoItem[]) {
      state.todoList = todoList;
    },
  },
  actions: {
    setTodoList({ commit }, todoList: ToDoItem) {
      commit("SET_TODO_LIST", todoList);
    },
    clearTodoList({ commit }, todoList: ToDoItem) {
      const index = this.state.todoList.indexOf(todoList);
      this.state.todoList.splice(index, 1)
      commit("CLEAR_TODO_LIST", this.state.todoList);
    },
    editTodoList({ commit }, { todo, indexToUpdate }) {
      this.state.todoList[indexToUpdate] = todo;

      commit("CLEAR_TODO_LIST", this.state.todoList);
    },
  },
  getters: {

    todoList: (state) => state.todoList,
  },
  modules: {
  }
})
