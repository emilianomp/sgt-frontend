<template>
  <ul>
    <li v-for="task in tasks" :key="task._id">
      <label>
        <input type="checkbox" v-model="task.completed" @change="toggleCompleted(task)" />
        <span :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">
          {{ task.title }} - {{ task.description }}
        </span>
      </label>
      <button @click="$emit('edit', task)">✏️</button>
      <button @click="deleteTask(task._id)">🗑️</button>
    </li>
  </ul>
</template>

<script setup>
    import axios from 'axios'
    const props = defineProps({ tasks: Array })
    const emit = defineEmits(['edit', 'deleted', 'toggled'])

    const deleteTask = async (id) => {
    await axios.delete(`https://sgt-api.onrender.com/api/tasks/${id}`)
    emit('deleted')
    }

    const toggleCompleted = async (task) => {
    await axios.put(`https://sgt-api.onrender.com/api/tasks/${task._id}`, {
        completed: task.completed,
        title: task.title,
        description: task.description
    })
    emit('toggled')
    }
</script>
