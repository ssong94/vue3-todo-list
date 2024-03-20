<template>
  <div style="align-content: center">
  <div class="center">Todo List</div>
  <br/>
  <a-space direction="vertical">
    <a-input-search
        v-model:value="searchInput"
        placeholder="검색"
        enter-button
        @input="filterTodos"
    />

    <a-divider/>

    <a-input-group compact>
      <a-input-search
          v-model:value="todoInput"
          placeholder="할일"
          size="large"
          show-count :maxlength="20"
          @keyup.enter="addNewTodo"
      >
        <template #enterButton>
          <a-button type="primary" @click="addNewTodo">➕</a-button>
        </template>
      </a-input-search>
    </a-input-group>


    <a-checkbox v-for="todo in todos" :key="todo.id" v-model:checked="todo.checked ">{{ todo.text }}
    <a-button type="primary" danger @click="deleteTodo(todo.id)">➖</a-button>
    </a-checkbox>

  </a-space>



  </div>
</template>


<script setup>


import {computed, ref} from "vue";

const todos = ref([
  {
    id: 1,
    text: 'test-todo1',
    checked: false
  },
  {
    id:2,
    text: 'test-todo2',
    checked: true
  },
  {
    id:3,
    text: 'test-todo3',
    checked: false
  }
]
)

const searchInput = ref('');
const todoInput = ref('');

const filterTodos = computed(() => {
  console.log("dd")
  const searchText = searchInput.value.trim();

  if (!searchText) {
    return todos.value;
  }

  return todos.value.filter(x => x.text.toLowerCase().includes(searchText.toLowerCase()))

});

const addNewTodo = () => {

  const text = todoInput.value.trim();

  if(!text) {
    return
  }

  if(hasTextInTodos(text)) {
    alert(`"${text}"가 이미 존재해요.`)
  } else {
    todos.value.push( createTodoObj(text) )
  }

  clearTodoInput();
}

const createTodoObj = text => {
  return {
    id: createRandomKey(),
    checked: false,
    text
  }
}

const hasTextInTodos = value => todos.value.some(el => el.text === value);

const deleteTodo = (id) => {
  console.log("Delete todo with id: " + id);
  todos.value = todos.value.filter(obj => obj.id !== id);
}



const clearTodoInput = () => todoInput.value = ''
const createRandomKey = () => Date.now()






</script>
