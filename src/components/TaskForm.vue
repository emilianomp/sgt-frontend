<script setup>
  import { ref, watch, computed } from 'vue'
  import axios from 'axios'
  const props = defineProps({ editTask: Object })
  const emit = defineEmits(['saved'])

  const title = ref('')
  const description = ref('')
  const id = ref(null)

  const isEdit = computed(() => !!id.value)

  watch(
    () => props.editTask,
    (newVal) => {
      if (newVal) {
        title.value = newVal.title
        description.value = newVal.description
        id.value = newVal._id
      }
    },
    { immediate: true }
  )

  const clear = () => {
    title.value = ''
    description.value = ''
    id.value = null
    emit('saved')
  }

  const handleSubmit = async () => {
    if (isEdit.value) {
      await axios.put(`https://sgt-api.onrender.com/api/tasks/${id.value}`, {
        title: title.value,
        description: description.value
      })
    } else {
      await axios.post('https://sgt-api.onrender.com/api/tasks', {
        title: title.value,
        description: description.value
      })
    }
    clear()
  }
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="title" placeholder="Título" required />
    <input v-model="description" placeholder="Descripción" required />
    <button type="submit">{{ isEdit ? 'Actualizar' : 'Crear' }}</button>
    <button v-if="isEdit" type="button" @click="clear">Cancelar</button>
  </form>
</template>