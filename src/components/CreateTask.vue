<script setup>
import { ref } from 'vue';
import api from '../services/api';

const newTask = ref({
  title: '',
  description: '',
  completed: false
});
const error = ref(null);
const success = ref(null);

const submitTask = async () => {
  try {
    const response = await api.post('/tasks', newTask.value);
    success.value = 'Tarea creada exitosamente!';
    newTask.value = { title: '', description: '', completed: false };
    setTimeout(() => success.value = null, 3000);
  } catch (err) {
    error.value = 'Error al crear la tarea';
    console.error(err);
  }
};
</script>

<template>
  <div>
    <h2>Crear Nueva Tarea</h2>
    <form @submit.prevent="submitTask">
      <div>
        <label>Título:</label>
        <input v-model="newTask.title" required>
      </div>
      <div>
        <label>Descripción:</label>
        <textarea v-model="newTask.description"></textarea>
      </div>
      <button type="submit">Crear Tarea</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>
  </div>
</template>