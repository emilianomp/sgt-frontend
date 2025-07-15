<template>
  <main class="max-w-3xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Sistema de Gestión de Tareas</h1>
    <TaskForm :editTask="taskToEdit" @saved="handleTaskSaved" />
    <div class="space-x-2 my-4">
      <button class="btn" @click="filter = 'all'">Todas</button>
      <button class="btn" @click="filter = 'completed'">Completadas</button>
      <button class="btn" @click="filter = 'pending'">Pendientes</button>
    </div>
    <TaskList :tasks="filteredTasks" @edit="startEdit" @deleted="fetchTasks" @toggled="fetchTasks" />
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { io } from 'socket.io-client'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

const tasks = ref([])
const taskToEdit = ref(null)
const filter = ref('all')
const fetchTasks = async () => {
  const res = await axios.get('https://sgt-api.onrender.com/api/tasks')
  tasks.value = res.data
}

const startEdit = (task) => {
  taskToEdit.value = { ...task }
}

const handleTaskSaved = () => {
  taskToEdit.value = null
  fetchTasks()
}

const filteredTasks = computed(() => {
  if (filter.value === 'completed') return tasks.value.filter(t => t.completed)
  if (filter.value === 'pending') return tasks.value.filter(t => !t.completed)
  return tasks.value
})

onMounted(() => {
  fetchTasks()
  const socket = io('https://sgt-api.onrender.com')
  socket.on('taskUpdated', fetchTasks)
  socket.on('taskCreated', fetchTasks)
  socket.on('taskDeleted', fetchTasks)
})
</script>

<style scoped>
.btn {
  @apply bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600;
}
</style>