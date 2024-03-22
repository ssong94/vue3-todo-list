<template>
  <div class="space-align-container">

  <div class="center">Todo List</div>
  <br/>

  <a-space direction="vertical">
    <a-input-search
        m-model:value="searchInput"
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

    <a-checkbox @change="changeStatus(todo, $event)" v-for="todo in filterTodos" :key="todo.id" v-model:checked="todo.checked ">

      <a-input-group v-if="isEditMode && editObj.id === todo.id" compact>
        <a-input  @blur="isEditMode = false" v-model:value="editObj.text" show-count :maxlength="15" placeholder="" @keyup.enter="doEditTodo(todo)" style="width: calc(70% - 0px)" />
        <a-button type="text" @click.prevent="isEditMode = false">❌</a-button>
      </a-input-group>

      <div v-else>
        {{ todo.text }}
        <a-button type="text" @click.prevent="goEditMode(todo)">✏️️</a-button>
        <a-popconfirm
            title="삭제하시겠어요?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="deleteTodo(todo.id)"
        >
          <a-button type="text" danger>🗑️</a-button>
        </a-popconfirm>
      </div>

    </a-checkbox>

    <a-empty v-show="todos.length === 0" />
    <a-pagination v-show="todos.length !== 0" v-model:pageSize=pageSize v-model:current="currentPage" :total="totalPageCount" />


  </a-space>



  </div>
</template>


<script setup>


import {computed, reactive, ref, watch} from "vue";
import { message } from 'ant-design-vue'
import axios from "axios";

const todos = ref([])

const pageSize = ref(5);
const totalPageCount = ref(500);
const searchInput = ref('');
const todoInput = ref('');
const isEditMode = ref(false)
const currentPage = ref(1);
const editObj = reactive({
  id: 0,
  text: ''
})

const url = 'http://localhost:3001/todos'

const checkedCount = computed(() => {
  let count = 0;
  todos.value.forEach(obj => obj.checked && count++)
  return count;
})

watch(pageSize, () => {
  console.log('pageSize', pageSize.value);
});

watch(currentPage, async() => {
  // const data = await axios.get('https://jsonplaceholder.typicode.com/posts');
  // console.log(data);
})

const getTodos = async () => {
  const res = await axios.get(url)
  todos.value = res.data;
}

getTodos();

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

    axios.post(url, createTodoObj(text))
        .then(getTodos)

  }

  clearTodoInput();
}

const doEditTodo = (obj) => {
  const id = obj.id

  const updateData = {
    id,
    text: editObj.text
  }

  updateTodo(updateData);

  isEditMode.value = false
}

const changeStatus = (todo, e) => {
  const checked = e.target.checked;

  const updateData = {
    id: todo.id,
    checked: checked
  }

  updateTodo(updateData)
}

const updateTodo = (obj) => {
  axios.patch(`${url}/${obj.id}`, obj)
      .then(getTodos)
      .catch(() => alert('오류 발생'))
}

const goEditMode = obj => {
  isEditMode.value = true
  editObj.id = obj.id
  editObj.text = obj.text;

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
  axios.delete(`${url}/${id}`)
      .then(confirm)
      .then(getTodos)
      .catch(() => alert('error'))
}



const clearTodoInput = () => todoInput.value = ''
const createRandomKey = () => Date.now()






</script>
