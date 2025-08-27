<template>
  <div class="card-modern">
         <form @submit.prevent="handleSubmit" class="space-y-6" novalidate>
      <!-- Dynamic Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div 
           v-for="field in sortedFields" 
           :key="field.id"
           :class="[
             'animate-slide-up',
             field.type === 'textarea' || field.type === 'checkbox' ? 'md:col-span-2' : ''
           ]"
         >
                                <!-- Text Input -->
           <div v-if="field.type === 'text'">
             <label :for="field.id" class="flex items-center text-sm font-medium text-gray-700 mb-2">
               {{ field.label }}
               <span v-if="field.required" class="text-red-500">*</span>
               <button 
                 v-if="field.hasInfo" 
                 type="button"
                 @click="showInfo(field.id)"
                 class="ml-2 inline-flex items-center justify-center w-5 h-5 text-blue-500 hover:text-blue-700 transition-colors"
                 title="Показати приклад"
               >
                 <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                 </svg>
               </button>
             </label>
             <input
               :id="field.id"
               v-model="formData[field.id]"
               type="text"
               :placeholder="field.placeholder"
               :class="[
                 'form-input h-[50px]',
                 validationErrors[field.id] ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50' : ''
               ]"
               @input="clearValidationError(field.id)"
             />
              <div v-if="validationErrors[field.id]" class="mt-1 text-xs text-red-600 animate-pulse">
                {{ validationErrors[field.id] }}
              </div>
            </div>

                                <!-- Email Input -->
           <div v-else-if="field.type === 'email'">
             <label :for="field.id" class="flex items-center text-sm font-medium text-gray-700 mb-2">
               {{ field.label }}
               <span v-if="field.required" class="text-red-500">*</span>
               <button 
                 v-if="field.hasInfo" 
                 type="button"
                 @click="showInfo(field.id)"
                 class="ml-2 inline-flex items-center justify-center w-5 h-5 text-blue-500 hover:text-blue-700 transition-colors"
                 title="Показати приклад"
               >
                 <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                 </svg>
               </button>
             </label>
             <input
               :id="field.id"
               v-model="formData[field.id]"
               type="email"
               :placeholder="field.placeholder"
               :class="[
                 'form-input h-[50px]',
                 validationErrors[field.id] ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50' : ''
               ]"
               @input="clearValidationError(field.id)"
             />
              <div v-if="validationErrors[field.id]" class="mt-1 text-xs text-red-600 animate-pulse">
                {{ validationErrors[field.id] }}
              </div>
            </div>

                                <!-- Phone Input -->
           <div v-else-if="field.type === 'phone'">
             <label :for="field.id" class="flex items-center text-sm font-medium text-gray-700 mb-2">
               {{ field.label }}
               <span v-if="field.required" class="text-red-500">*</span>
               <button 
                 v-if="field.hasInfo" 
                 type="button"
                 @click="showInfo(field.id)"
                 class="ml-2 inline-flex items-center justify-center w-5 h-5 text-blue-500 hover:text-blue-700 transition-colors"
                 title="Показати приклад"
               >
                 <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                 </svg>
               </button>
             </label>
             <input
               :id="field.id"
               v-model="formData[field.id]"
               type="tel"
               :placeholder="field.placeholder"
               :class="[
                 'form-input h-[50px]',
                 validationErrors[field.id] ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50' : ''
               ]"
               @input="clearValidationError(field.id)"
             />
              <div v-if="validationErrors[field.id]" class="mt-1 text-xs text-red-600 animate-pulse">
                {{ validationErrors[field.id] }}
              </div>
            </div>

                     <!-- Select Input -->
           <div v-else-if="field.type === 'select'">
             <label :for="field.id" class="flex items-center text-sm font-medium text-gray-700 mb-2">
               {{ field.label }}
               <span v-if="field.required" class="text-red-500">*</span>
               <button 
                 v-if="field.hasInfo" 
                 type="button"
                 @click="showInfo(field.id)"
                 class="ml-2 inline-flex items-center justify-center w-5 h-5 text-blue-500 hover:text-blue-700 transition-colors"
                 title="Показати приклад"
               >
                 <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                 </svg>
               </button>
             </label>
                         <select
               :id="field.id"
               v-model="formData[field.id]"
               :class="[
                 'form-select h-[50px]',
                 validationErrors[field.id] ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50' : ''
               ]"
               @change="clearValidationError(field.id)"
             >
               <option value="" disabled>{{ field.placeholder || 'Оберіть опцію' }}</option>
               <option 
                 v-for="option in field.options" 
                 :key="option" 
                 :value="option"
               >
                 {{ option }}
               </option>
             </select>
            <div v-if="validationErrors[field.id]" class="mt-1 text-xs text-red-600 animate-pulse">
              {{ validationErrors[field.id] }}
            </div>
          </div>

          <!-- Checkbox Input -->
          <div v-else-if="field.type === 'checkbox'">
            <div class="flex items-center">
                             <input
                 :id="field.id"
                 v-model="formData[field.id]"
                 type="checkbox"
                 :class="[
                   'h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded shrink-0',
                   validationErrors[field.id] ? 'border-red-500 focus:ring-red-500' : ''
                 ]"
                 @change="clearValidationError(field.id)"
               />
              <label :for="field.id" class="ml-2 block text-sm text-gray-700">
                {{ field.label }}
                <span v-if="field.required" class="text-red-500">*</span>
                <button 
                  v-if="field.hasInfo" 
                  type="button"
                  @click="showInfo(field.id)"
                  class="ml-2 inline-flex items-center justify-center w-5 h-5 text-blue-500 hover:text-blue-700 transition-colors"
                  title="Показати приклад"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </button>
              </label>
            </div>
                                                   <div v-if="validationErrors[field.id]" class="mt-1 ml-6 text-xs text-red-600 animate-pulse">
                {{ validationErrors[field.id] }}
              </div>
          </div>

                     <!-- File Upload -->
           <div v-else-if="field.type === 'file'">
             <label :for="field.id" class="flex items-center text-sm font-medium text-gray-700 mb-2">
               {{ field.label }}
               <span v-if="field.required" class="text-red-500">*</span>
               <button 
                 v-if="field.hasInfo" 
                 type="button"
                 @click="showInfo(field.id)"
                 class="ml-2 inline-flex items-center justify-center w-5 h-5 text-blue-500 hover:text-blue-700 transition-colors"
                 title="Показати приклад"
               >
                 <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                 </svg>
               </button>
             </label>
             <div class="space-y-2">
               <input
                 :id="field.id"
                 type="file"
                 @change="handleFileChange"
                 :class="[
                   'form-input h-[50px]',
                   validationErrors[field.id] ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50' : ''
                 ]"
                 :accept="getFileAcceptTypes()"
               />
               <div v-if="selectedFile" class="text-sm text-gray-600">
                 <span class="font-medium">Вибрано:</span> {{ selectedFile.name }}
                 <span class="text-red-500">({{ formatFileSize(selectedFile.size) }})</span>
               </div>
             </div>
                         <div v-if="validationErrors[field.id]" class="mt-1 text-xs text-red-600 animate-pulse">
               {{ validationErrors[field.id] }}
             </div>
          </div>

                     <!-- Textarea Input -->
           <div v-else-if="field.type === 'textarea'">
             <label :for="field.id" class="flex items-center text-sm font-medium text-gray-700 mb-2">
               {{ field.label }}
               <span v-if="field.required" class="text-red-500">*</span>
               <button 
                 v-if="field.hasInfo" 
                 type="button"
                 @click="showInfo(field.id)"
                 class="ml-2 inline-flex items-center justify-center w-5 h-5 text-blue-500 hover:text-blue-700 transition-colors"
                 title="Показати приклад"
               >
                 <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                 </svg>
               </button>
             </label>
             <textarea
               :id="field.id"
               v-model="formData[field.id]"
               :placeholder="field.placeholder"
               rows="4"
               :class="[
                 'form-input',
                 validationErrors[field.id] ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50' : ''
               ]"
               @input="clearValidationError(field.id)"
             ></textarea>
              <div v-if="validationErrors[field.id]" class="mt-1 text-xs text-red-600 animate-pulse">
                {{ validationErrors[field.id] }}
              </div>
            </div>
        </div>
      </div>

             <!-- Submit Button -->
       <div class="pt-4 flex justify-center">
         <button
           type="submit"
           :disabled="loading"
           class="w-full md:w-auto md:px-8 btn-hero disabled:opacity-50 disabled:cursor-not-allowed"
         >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Відправлення...
            </span>
          <span v-else class="flex items-center gap-2 justify-center">
            <svg class="w-5 h-5 rotate-45 -mt-1 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
            Відправити форму
          </span>
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
                            <h3 class="text-lg font-semibold text-gray-900 mb-2">Дякуємо!</h3>
                    <p class="text-gray-600 mb-6">
                      Ваша форма успішно відправлена. Ми зв'яжемося з вами найближчим часом.
                    </p>
                    <button 
                      @click="closeSuccessModal"
                      class="btn-hero"
                    >
                      Закрити
                    </button>
      </div>
    </div>

    <!-- Info Popup -->
    <div 
      v-if="showInfoPopup"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeInfoPopup"
    >
      <div class="relative max-w-2xl mx-4 animate-scale-in" @click.stop>
        <button 
          @click="closeInfoPopup"
          class="absolute -top-4 -right-4 text-white hover:text-gray-200 transition-colors duration-200 z-10 bg-black bg-opacity-5 opacity-70 rounded-full p-2"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div class="text-center">
          <img 
            src="/example.png" 
            alt="Приклад заповнення поля" 
            class="max-w-full h-auto rounded-lg mx-auto"
          />
        </div>
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
const showInfoPopup = ref(false)
const currentInfoField = ref<string | null>(null)
const validationErrors = ref<Record<string, string>>({})

// Sort fields by order
const sortedFields = computed(() => {
  return [...props.form.fields].sort((a, b) => a.order - b.order)
})

// Initialize form data
onMounted(() => {
  props.form.fields.forEach(field => {
    if (field.type === 'checkbox') {
      formData.value[field.id] = false
    } else if (field.type === 'select') {
      // For select fields, set empty value to show placeholder
      formData.value[field.id] = ''
    } else {
      formData.value[field.id] = ''
    }
    
    // Initialize hasInfo if not present
    if (field.hasInfo === undefined) {
      field.hasInfo = false
    }
  })
})

// Handle file selection
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
    // Clear validation error for file field
    const fieldId = target.id
    if (validationErrors.value[fieldId]) {
      clearValidationError(fieldId)
    }
  }
}

// Get file accept types for input
const getFileAcceptTypes = () => {
  return '.jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv'
}

// Format file size for display
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Show info popup
const showInfo = (fieldId: string) => {
  currentInfoField.value = fieldId
  showInfoPopup.value = true
}

// Close info popup
const closeInfoPopup = () => {
  showInfoPopup.value = false
  currentInfoField.value = null
}

// Close success modal and reset form completely
const closeSuccessModal = () => {
  showSuccess.value = false
  
  // Reset form data
  props.form.fields.forEach(field => {
    if (field.type === 'checkbox') {
      formData.value[field.id] = false
    } else if (field.type === 'select') {
      formData.value[field.id] = ''
    } else {
      formData.value[field.id] = ''
    }
  })
  
  // Reset file
  selectedFile.value = null
  
  // Clear all file inputs
  const fileInputs = document.querySelectorAll('input[type="file"]')
  fileInputs.forEach((input) => {
    if (input instanceof HTMLInputElement) {
      input.value = ''
    }
  })
  
  // Clear validation errors
  validationErrors.value = {}
  
  // Close info popup if open
  if (showInfoPopup.value) {
    closeInfoPopup()
  }
}

// Validate form fields
const validateForm = () => {
  validationErrors.value = {}
  let isValid = true
  
  props.form.fields.forEach(field => {
    if (field.required) {
      const value = formData.value[field.id]
      
      if (field.type === 'checkbox') {
        if (!value) {
          validationErrors.value[field.id] = 'Поле є обов\'язковим'
          isValid = false
        }
      } else if (field.type === 'file') {
        if (!selectedFile.value) {
          validationErrors.value[field.id] = 'Поле є обов\'язковим'
          isValid = false
        }
      } else {
        if (!value || value.trim() === '') {
          validationErrors.value[field.id] = 'Поле є обов\'язковим'
          isValid = false
        }
      }
    }
  })
  
  return isValid
}

// Clear validation error for specific field
const clearValidationError = (fieldId: string) => {
  if (validationErrors.value[fieldId]) {
    delete validationErrors.value[fieldId]
  }
}


// Handle form submission
const handleSubmit = async () => {
  // Clear previous validation errors
  validationErrors.value = {}
  
  // Validate form before submission
  if (!validateForm()) {
    // Small delay to make validation errors more visible
    await new Promise(resolve => setTimeout(resolve, 100))
    return
  }
  
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
        } else if (field.type === 'select') {
          // For select fields, reset to empty value to show placeholder
          formData.value[field.id] = ''
        } else {
          formData.value[field.id] = ''
        }
      })
      
      // Reset file input
      selectedFile.value = null
      
      // Clear file input element
      const fileInputs = document.querySelectorAll('input[type="file"]')
      fileInputs.forEach((input) => {
        if (input instanceof HTMLInputElement) {
          input.value = ''
        }
      })
      
      // Also clear any file input by ID if we know the field ID
      props.form.fields.forEach(field => {
        if (field.type === 'file') {
          const fileInput = document.getElementById(field.id) as HTMLInputElement
          if (fileInput) {
            fileInput.value = ''
          }
        }
      })
      
      // Close info popup if open
      if (showInfoPopup.value) {
        closeInfoPopup()
      }
      
      // Clear validation errors on success
      validationErrors.value = {}
    } else {
      alert('Помилка відправлення форми: ' + result.error)
    }
  } catch (error) {
    console.error('Form submission error:', error)
    alert('Сталася помилка під час відправлення форми.')
  } finally {
    loading.value = false
    
    // Close info popup if open
    if (showInfoPopup.value) {
      closeInfoPopup()
    }
  }
}
</script>
