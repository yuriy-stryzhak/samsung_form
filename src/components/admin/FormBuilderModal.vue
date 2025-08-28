<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
                                <h2 class="text-2xl font-bold text-gray-900">
                        {{ editingForm ? 'Редагувати форму' : 'Створити нову форму' }}
                      </h2>
          <button 
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <form @submit.prevent="handleSave" class="p-6 space-y-6">
                            <!-- Form Name -->
                    <div>
                      <label for="formName" class="block text-sm font-medium text-gray-700 mb-2">
                        Назва форми
                      </label>
                      <input
                        id="formName"
                        v-model="formData.name"
                        type="text"
                        required
                        class="admin-input"
                        placeholder="Введіть назву форми"
                      />
                    </div>

        <!-- Fields Section -->
        <div>
                                <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-medium text-gray-900">Поля форми</h3>
                        <button 
                          type="button"
                          @click="addField"
                          class="btn-ghost flex items-center gap-2"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                          </svg>
                          Додати поле
                        </button>
                      </div>

          <div class="space-y-4">
            <div 
              v-for="(field, index) in formData.fields" 
              :key="field.id"
              class="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <!-- Field Type -->
                            <div>
                              <label class="block text-sm font-medium text-gray-700 mb-2">Тип поля</label>
                              <select 
                                v-model="field.type"
                                class="admin-select"
                                @change="handleFieldTypeChange(field)"
                              >
                                <option value="text">Текст</option>
                                <option value="email">Email</option>
                                <option value="phone">Телефон</option>
                                <option value="select">Випадаючий список</option>
                                <option value="checkbox">Прапорець</option>
                                <option value="file">Завантаження файлу</option>
                                <option value="textarea">Текстове поле</option>
                              </select>
                            </div>

                            <!-- Field Label -->
                            <div>
                              <label class="block text-sm font-medium text-gray-700 mb-2">Мітка</label>
                              <input
                                v-model="field.label"
                                type="text"
                                required
                                class="admin-input"
                                placeholder="Мітка поля"
                              />
                            </div>
              </div>

                                        <!-- Field Options (for select fields) -->
                          <div v-if="field.type === 'select'" class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                              Опції (через кому)
                            </label>
                            <textarea
                              v-model="field.optionsText"
                              rows="3"
                              class="admin-textarea"
                              placeholder="Опція 1, Опція 2, Опція 3"
                              @input="updateSelectOptions(field)"
                            ></textarea>
                          </div>

                          <!-- Field Placeholder -->
                          <div v-if="field.type !== 'checkbox' && field.type !== 'file'" class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Плейсхолдер</label>
                            <input
                              v-model="field.placeholder"
                              type="text"
                              class="admin-input"
                              placeholder="Плейсхолдер поля"
                            />
                          </div>

              <!-- Field Settings -->
              <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                                <label class="flex items-center">
                                <input
                                  v-model="field.required"
                                  type="checkbox"
                                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <span class="ml-2 text-sm text-gray-700">Обов'язкове</span>
                              </label>
                              
                              <label class="flex items-center">
                                <input
                                  v-model="field.hasInfo"
                                  type="checkbox"
                                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <span class="ml-2 text-sm text-gray-700">Показати іконку інформації</span>
                              </label>
                              
                              <label class="flex items-center">
                                <input
                                  v-model="field.hasInfo2"
                                  type="checkbox"
                                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <span class="ml-2 text-sm text-gray-700">Показати іконку інформації 2</span>
                              </label>
                </div>

                <div class="flex items-center justify-center lg:justify-end space-x-2">
                                     <button 
                     type="button"
                     @click="moveField(index, -1)"
                     :disabled="index === 0"
                     class="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                     title="Перемістити вгору"
                   >
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                     </svg>
                   </button>
                   <button 
                     type="button"
                     @click="moveField(index, 1)"
                     :disabled="index === formData.fields.length - 1"
                     class="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                     title="Перемістити вниз"
                   >
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                     </svg>
                   </button>
                   <button 
                     type="button"
                     @click="removeField(index)"
                     class="p-2 text-red-400 hover:text-red-600"
                     title="Видалити поле"
                   >
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                     </svg>
                   </button>
                </div>
              </div>
            </div>
          </div>

                                <!-- No Fields Message -->
                      <div v-if="formData.fields.length === 0" class="text-center py-8 text-gray-500">
                        <p>Поки що не додано жодного поля. Натисніть "Додати поле" щоб почати.</p>
                      </div>
        </div>

                            <!-- Form Activation -->
                    <div class="flex items-center">
                      <input
                        id="isActive"
                        v-model="formData.is_active"
                        type="checkbox"
                        class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label for="isActive" class="ml-2 text-sm text-gray-700">
                        Зробити цю форму активною (тільки одна форма може бути активною одночасно)
                      </label>
                    </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                                <button 
                        type="button"
                        @click="$emit('close')"
                        class="btn-ghost w-full sm:w-auto order-2 sm:order-1"
                      >
                        Скасувати
                      </button>
                      <button 
                        type="submit"
                        class="btn-hero flex items-center justify-center gap-2 w-full sm:w-auto order-1 sm:order-2"
                      >
                        <svg v-if="!editingForm" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        {{ editingForm ? 'Оновити форму' : 'Створити форму' }}
                      </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Form, FormField } from '@/stores/forms'

interface Props {
  form?: Form | null
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'save'])

// Computed property to determine if we're editing an existing form
const editingForm = computed(() => !!props.form)

const formData = ref({
  name: '',
  fields: [] as (FormField & { optionsText?: string })[],
  is_active: false
})

// Initialize form data
onMounted(() => {
  if (props.form) {
    formData.value = {
      name: props.form.name,
      fields: props.form.fields.map(field => ({
        ...field,
        optionsText: field.options ? field.options.join(', ') : '',
        hasInfo: field.hasInfo || false,
        hasInfo2: field.hasInfo2 || false
      })),
      is_active: Boolean(props.form.is_active)
    }
  } else {
    formData.value = {
      name: '',
      fields: [],
      is_active: false
    }
  }
})

// Add new field
const addField = () => {
  const newField: FormField & { optionsText?: string } = {
    id: `field_${Date.now()}`,
    type: 'text',
    label: '',
    required: false,
    placeholder: '',
    order: formData.value.fields.length,
    options: [],
    optionsText: '',
    hasInfo: false,
    hasInfo2: false
  }
  formData.value.fields.push(newField)
}

// Remove field
const removeField = (index: number) => {
  formData.value.fields.splice(index, 1)
  // Update order
  formData.value.fields.forEach((field, idx) => {
    field.order = idx
  })
}

// Move field up/down
const moveField = (index: number, direction: number) => {
  const newIndex = index + direction
  if (newIndex >= 0 && newIndex < formData.value.fields.length) {
    const field = formData.value.fields[index]
    formData.value.fields.splice(index, 1)
    formData.value.fields.splice(newIndex, 0, field)
    
    // Update order
    formData.value.fields.forEach((f, idx) => {
      f.order = idx
    })
  }
}

// Handle field type change
const handleFieldTypeChange = (field: FormField & { optionsText?: string }) => {
  if (field.type === 'select') {
    field.options = []
    field.optionsText = ''
  } else {
    delete field.options
    delete field.optionsText
  }
}

// Update select options
const updateSelectOptions = (field: FormField & { optionsText?: string }) => {
  if (field.optionsText) {
    field.options = field.optionsText.split(',').map(option => option.trim()).filter(Boolean)
  } else {
    field.options = []
  }
}

// Handle form save
const handleSave = () => {
  // Validate form
  if (!formData.value.name.trim()) {
    alert('Будь ласка, введіть назву форми')
    return
  }

  if (formData.value.fields.length === 0) {
    alert('Будь ласка, додайте хоча б одне поле')
    return
  }

  // Validate fields
  for (const field of formData.value.fields) {
    if (!field.label.trim()) {
      alert('Будь ласка, введіть мітки для всіх полів')
      return
    }
  }

  // Prepare data for save
  const saveData = {
    name: formData.value.name,
    fields: formData.value.fields.map(field => {
      const { optionsText, ...fieldData } = field
      return fieldData
    }),
    is_active: formData.value.is_active
  }

  emit('save', saveData)
}
</script>
