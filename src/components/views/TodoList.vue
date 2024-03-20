<template>
  <div class="space-align-container">

  <div class="center">Todo List</div>
  <br/>

  <a-space direction="vertical">
    <a-input-search
        v-model:value="searchInput"
        placeholder="검색"
        enter-button
        @keyup="changeValue"
    />

    <a-divider/>

    <a-row :gutter="16">
      <a-col :span="12">
        <a-statistic title="진행상황" :value="checkedCount" class="demo-class">
          <template #suffix>
            <span>
              /
              {{ todos.length }}
            </span>
          </template>
        </a-statistic>
      </a-col>
    </a-row>

    <a-input-group compact>
      <a-input-search
          v-model:value="todoInput"
          placeholder="할일"
          size="large"
          show-count :maxlength="15"
          @keyup.enter="addNewTodo"
      >
        <template #enterButton>
          <a-button type="primary" @click="addNewTodo">➕</a-button>
        </template>

      </a-input-search>

    </a-input-group>


    <a-checkbox v-for="todo in filterTodos" :key="todo.id" v-model:checked="todo.checked ">{{ todo.text }}

      <a-popconfirm
          title="삭제하시겠어요?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteTodo(todo.id)"
      >
        <a-button type="text" danger>🗑️</a-button>
      </a-popconfirm>



    </a-checkbox>

    <a-empty v-if="todos.length === 0" />


  </a-space>



  </div>
</template>


<script setup>


import {computed, ref} from "vue";
import { message } from 'ant-design-vue'

const todos = ref([
  {
    id: 1,
    text: 'test-todo1 할일1 와',
    checked: false
  },
  {
    id:2,
    text: 'test-todo2 할일2',
    checked: true
  },
  {
    id:3,
    text: 'test-todo3 할일3',
    checked: false
  }
]
)


const searchInput = ref('');
const todoInput = ref('');


const checkedCount = computed(() => {
  let count = 0;
  todos.value.forEach(obj => obj.checked && count++)
  return count;
})


const filterTodos = computed(() => {

  const searchText = searchInput.value.trim();

  if (!searchText) {
    return todos.value;
  }

  return todos.value.filter(x => x.text.toLowerCase().includes(searchText.toLowerCase()))

});

const confirm = () => {
  message.success('삭제되었어요.');
};


const changeValue = (e) => {
  searchInput.value = e.target.value;
}


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
  todos.value = todos.value.filter(obj => obj.id !== id);
  confirm();
}



const clearTodoInput = () => todoInput.value = ''
const createRandomKey = () => Date.now()






</script>
