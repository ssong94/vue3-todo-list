<template>

  <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial', textAlign: 'center'}">

    <a-divider>
      <a-typography-title>Todo List</a-typography-title>
    </a-divider>

  <a-space direction="vertical">
    <a-input-search
        m-model:value="searchInput"
        placeholder="검색"
        enter-button
        @keyup="changeValue"
    />

    <a-divider >
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
    </a-divider>


    <a-input-group size="large">
      <a-input-search
          v-model:value="todoInput"
          placeholder="할 일을 입력해 주세요."
          size="large"
          show-count :maxlength="15"
          @keyup.enter="addNewTodo"
      >
        <template #enterButton>
          <a-button type="primary" @click="addNewTodo">➕</a-button>
        </template>

      </a-input-search>

    </a-input-group>


    <a-list v-if="filterTodos.length !== 0" item-layout="horizontal" :data-source="filterTodos">
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>

            <a-button v-if="isEditMode && editObj.id === item.id" type="link" @click.prevent="isEditMode = false">❌</a-button>

            <a-space v-else direction="horizontal">
              <a-button type="text" @click.prevent="goEditMode(item)">✏️️</a-button>
              <a-popconfirm
                  title="삭제하시겠어요?"
                  ok-text="Yes"
                  cancel-text="No"
                  @confirm="deleteTodo(item.id)"
              >
                <a-button type="link" danger size="small">🗑️</a-button>
              </a-popconfirm>
            </a-space>

          </template>
          <a-list-item-meta description="">
            <template #title>

              <a-input-group v-if="isEditMode && editObj.id === item.id" compact>
                <a-input  @blur="isEditMode = false" v-model:value="editObj.text" show-count :maxlength="15" placeholder="" @keyup.enter="doEditTodo(item)" style="width: calc(100% - 60px)" />
              </a-input-group>

              <a-checkbox v-else @change="changeStatus(item, $event)" v-model:checked="item.checked ">
                  {{ item.text }}
              </a-checkbox>

            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
      <a-pagination v-model:pageSize=paging.limit v-model:current="paging.currentPage" :total="paging.totalPageCount" />
    </a-list>
    <a-empty v-else />




  </a-space>

  </a-layout-content>
</template>


<script setup>


import {computed, reactive, ref, watch} from "vue";
import { message } from 'ant-design-vue'
import axios from "axios";
import {useRouter} from "vue-router";

const todos = ref([])
const paging = reactive({
  limit: 5,
  currentPage: 1,
  totalPageCount: 100
})
const router = useRouter()

const searchInput = ref('');
const todoInput = ref('');
const isEditMode = ref(false)
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

const getPagingParams = () => {
  return {
    _start: (paging.currentPage - 1) * paging.limit,
    _limit: paging.limit
  }
}

watch(() => [ paging.limit,paging.currentPage ], () => {
  getTodos()
  changeUrl(getPagingParams())
});

const changeUrl = (data) => {
  router.replace(`/todo-list${toQueryParams(data)}`)

}

const toQueryParams = params => '?' + new URLSearchParams(params).toString()

const getTodos = async () => {
  const params = getPagingParams();

  const res = await axios.get(`${url}${toQueryParams(params)}`)
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
