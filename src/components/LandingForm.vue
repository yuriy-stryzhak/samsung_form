<template>
  <div class="card-modern">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Dynamic Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="field in sortedFields" 
          :key="field.id"
          :class="[
            'animate-slide-up',
            field.type === 'textarea' ? 'md:col-span-2' : ''
          ]"
        >
          <!-- Text Input -->
          <div v-if="field.type === 'text'">
            <label :for="field.id" class="block text-sm font-medium text-gray-700 mb-2">
              {{ field.label }}
              <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <input
              :id="field.id"
              v-model="formData[field.id]"
              type="text"
              :placeholder="field.placeholder"
              :required="field.required"
              class="form-input h-[50px]"
            />
          </div>

          <!-- Email Input -->
          <div v-else-if="field.type === 'email'">
            <label :for="field.id" class="block text-sm font-medium text-gray-700 mb-2">
              {{ field.label }}
              <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <input
              :id="field.id"
              v-model="formData[field.id]"
              type="email"
              :placeholder="field.placeholder"
              :required="field.required"
              class="form-input h-[50px]"
            />
          </div>

          <!-- Phone Input -->
          <div v-else-if="field.type === 'phone'">
            <label :for="field.id" class="block text-sm font-medium text-gray-700 mb-2">
              {{ field.label }}
              <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <input
              :id="field.id"
              v-model="formData[field.id]"
              type="tel"
              :placeholder="field.placeholder"
              :required="field.required"
              class="form-input h-[50px]"
            />
          </div>

          <!-- Select Input -->
          <div v-else-if="field.type === 'select'">
            <label :for="field.id" class="block text-sm font-medium text-gray-700 mb-2">
              {{ field.label }}
              <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <select
              :id="field.id"
              v-model="formData[field.id]"
              :required="field.required"
              class="form-select h-[50px]"
            >
              <option value="">Select an option</option>
              <option 
                v-for="option in field.options" 
                :key="option" 
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </div>

          <!-- Checkbox Input -->
          <div v-else-if="field.type === 'checkbox'">
            <div class="flex items-center">
              <input
                :id="field.id"
                v-model="formData[field.id]"
                type="checkbox"
                :required="field.required"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label :for="field.id" class="ml-2 block text-sm text-gray-700">
                {{ field.label }}
                <span v-if="field.required" class="text-red-500">*</span>
              </label>
            </div>
          </div>

          <!-- File Upload -->
          <div v-else-if="field.type === 'file'">
            <label :for="field.id" class="block text-sm font-medium text-gray-700 mb-2">
              {{ field.label }}
              <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <input
              :id="field.id"
              type="file"
              @change="handleFileChange"
              :required="field.required"
              class="form-input h-[50px]"
            />
          </div>

          <!-- Textarea Input -->
          <div v-else-if="field.type === 'textarea'">
            <label :for="field.id" class="block text-sm font-medium text-gray-700 mb-2">
              {{ field.label }}
              <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <textarea
              :id="field.id"
              v-model="formData[field.id]"
              :placeholder="field.placeholder"
              :required="field.required"
              rows="4"
              class="form-input"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="pt-4">
        <button
          type="submit"
          :disabled="loading"
          class="w-full btn-hero disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
          <span v-else>Submit Form</span>
        </button>
      </div>
    </form>

    <!-- Success Message -->
    <div 
      v-if="showSuccess"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-8 max-w-md mx-4 text-center animate-scale-in">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Thank You!</h3>
        <p class="text-gray-600 mb-6">
          Your form has been submitted successfully. We'll get back to you soon.
        </p>
        <button 
          @click="showSuccess = false"
          class="btn-hero"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useFormsStore } from '@/stores/forms'
import type { Form, FormField } from '@/stores/forms'

interface Props {
  form: Form
}

const props = defineProps<Props>()
const formsStore = useFormsStore()

const formData = ref<Record<string, any>>({})
const selectedFile = ref<File | null>(null)
const loading = ref(false)
const showSuccess = ref(false)

// Sort fields by order
const sortedFields = computed(() => {
  return [...props.form.fields].sort((a, b) => a.order - b.order)
})

// Initialize form data
onMounted(() => {
  props.form.fields.forEach(field => {
    if (field.type === 'checkbox') {
      formData.value[field.id] = false
    } else {
      formData.value[field.id] = ''
    }
  })
})

// Handle file selection
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

// Handle form submission
const handleSubmit = async () => {
  try {
    loading.value = true
    
    const result = await formsStore.submitForm(
      props.form.id,
      formData.value,
      selectedFile.value || undefined
    )
    
    if (result.success) {
      showSuccess.value = true
      // Reset form
      props.form.fields.forEach(field => {
        if (field.type === 'checkbox') {
          formData.value[field.id] = false
        } else {
          formData.value[field.id] = ''
        }
      })
      selectedFile.value = null
    } else {
      alert('Error submitting form: ' + result.error)
    }
  } catch (error) {
    console.error('Form submission error:', error)
    alert('An error occurred while submitting the form.')
  } finally {
    loading.value = false
  }
}
</script>
