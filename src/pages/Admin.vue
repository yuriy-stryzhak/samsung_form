<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Show login form if not authenticated -->
    <LoginForm v-if="!authStore.isAuthenticated" />
    
    <!-- Show admin dashboard if authenticated -->
    <div v-else>
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-0 sm:h-16 space-y-3 sm:space-y-0">
            <div class="flex items-center">
              <h1 class="text-xl sm:text-2xl font-bold text-primary-600">Панель Адміністратора</h1>
            </div>
            <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <span class="text-sm sm:text-base text-gray-600">{{ authStore.user?.email }}</span>
                             <div class="flex items-center space-x-3">
                 <router-link 
                   to="/" 
                   class="text-sm sm:text-base text-gray-600 hover:text-primary-600 transition-colors duration-200 flex items-center gap-2"
                 >
                   <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                   </svg>
                   Переглянути сайт
                 </router-link>
                 <button 
                   @click="authStore.logout()"
                   class="btn-ghost flex items-center gap-2 text-sm sm:text-base"
                 >
                   <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                   </svg>
                   Вийти
                 </button>
               </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Tabs -->
      <div class="mb-8">
        <nav class="flex space-x-8 border-b border-gray-200">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
              activeTab === tab.id
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="animate-fade-in">
        <!-- Form Builder Tab -->
        <div v-if="activeTab === 'forms'" class="space-y-6">
                                  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                          <h2 class="text-2xl font-bold text-gray-900">Конструктор Форм</h2>
                          <button 
                            @click="showCreateForm = true"
                            class="btn-hero flex items-center justify-center gap-2 w-full sm:w-auto"
                          >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            Створити нову форму
                          </button>
                        </div>

                                  <!-- Forms List -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div 
                            v-for="form in sortedForms" 
                            :key="form.id"
                            :class="[
                              'card-modern transition-all duration-200',
                              form.is_active 
                                ? 'ring-1 ring-primary-500 bg-gradient-to-br from-primary-50 to-white shadow-lg' 
                                : 'hover:shadow-md'
                            ]"
                          >
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-3">
                    <h3 class="text-lg font-semibold text-gray-900">{{ form.name }}</h3>
                                                                                                             <span 
                                     v-if="form.is_active"
                                     class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-sm"
                                   >
                                     <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                     </svg>
                                     Активна
                                   </span>
                  </div>
                                                  <p class="text-gray-600 mb-4">
                                  {{ form.fields.length }} поле(ів) • Створено {{ formatDate(form.created_at) }}
                                </p>
                  <div class="flex flex-wrap gap-2">
                                                      <button 
                                    @click="editForm(form)"
                                    class="btn-ghost flex items-center gap-2 flex-shrink-0"
                                  >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                    Редагувати
                                  </button>
                                  <button 
                                    v-if="!form.is_active"
                                    @click="activateForm(form.id)"
                                    class="bg-transparent text-green-600 border border-green-600 font-medium py-2 px-4 rounded-lg hover:bg-green-50 transition-colors duration-200 flex items-center gap-2 flex-shrink-0"
                                  >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Активувати
                                  </button>
                                  <button 
                                    @click="deleteForm(form.id)"
                                    class="text-red-600 hover:text-red-800 transition-colors duration-200 flex items-center gap-2 flex-shrink-0 py-2 px-3 rounded-lg hover:bg-red-50"
                                  >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                    Видалити
                                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Submissions Tab -->
        <div v-if="activeTab === 'submissions'" class="space-y-6">
                                  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                          <h2 class="text-2xl font-bold text-gray-900">Відправлення Форм</h2>
                          <button 
                            @click="formsStore.fetchSubmissions()"
                            class="btn-ghost flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
                          >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                            Оновити
                          </button>
                        </div>

          <!-- Submissions Table -->
          <div class="card-modern overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                                                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Дата
                                  </th>
                                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Форма
                                  </th>
                                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Дані
                                  </th>
                                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Файл
                                  </th>
                                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Дії
                                  </th>
                                </tr>
                              </thead>
                              <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="submission in formsStore.submissions" :key="submission.id">
                                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ formatDate(submission.created_at) }}
                                  </td>
                                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ getFormName(submission.form_id) }}
                                  </td>
                                  <td class="px-6 py-4 text-sm text-gray-900">
                                    <div class="max-w-xs">
                                      <div v-for="(value, key) in submission.submission" :key="key" class="mb-1">
                                        <span class="font-medium text-gray-700">{{ getFieldLabel(submission.form_id, key) }}:</span>
                                        <span class="text-gray-600 ml-2">{{ value }}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <a 
                                      v-if="submission.file_link"
                                      :href="submission.file_link"
                                      target="_blank"
                                      class="text-primary-600 hover:text-primary-800 underline flex items-center gap-1"
                                    >
                                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                      </svg>
                                      Переглянути файл
                                    </a>
                                    <span v-else class="text-gray-400">Немає файлу</span>
                                  </td>
                                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <button 
                                      @click="deleteSubmission(submission.id)"
                                      class="text-red-600 hover:text-red-800 transition-colors duration-200 p-1"
                                                                             title="Видалити відправлення"
                                    >
                                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                      </svg>
                                    </button>
                                  </td>
                                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>

      <!-- Create/Edit Form Modal -->
      <FormBuilderModal 
        v-if="showCreateForm || editingForm"
        :form="editingForm"
        @close="closeFormModal"
        @save="saveForm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useFormsStore } from '@/stores/forms'
import FormBuilderModal from '@/components/admin/FormBuilderModal.vue'
import LoginForm from '@/components/admin/LoginForm.vue'
import type { Form } from '@/stores/forms'

const authStore = useAuthStore()
const formsStore = useFormsStore()

const activeTab = ref('forms')
const showCreateForm = ref(false)
const editingForm = ref<Form | null>(null)

// Sort forms so active form is always first
const sortedForms = computed(() => {
  return [...formsStore.forms].sort((a, b) => {
    if (a.is_active && !b.is_active) return -1
    if (!a.is_active && b.is_active) return 1
    return 0
  })
})

            const tabs = [
              { id: 'forms', name: 'Конструктор Форм' },
              { id: 'submissions', name: 'Відправлення' }
            ]

// Fetch data on mount
onMounted(async () => {
  await formsStore.fetchForms()
  await formsStore.fetchSubmissions()
})

// Form management
const editForm = (form: Form) => {
  editingForm.value = { ...form }
}

const closeFormModal = () => {
  showCreateForm.value = false
  editingForm.value = null
}

const saveForm = async (formData: any) => {
  if (editingForm.value) {
    await formsStore.updateForm(editingForm.value.id, formData)
  } else {
    await formsStore.createForm(formData)
  }
  closeFormModal()
}

const activateForm = async (id: number) => {
  await formsStore.activateForm(id)
}

const deleteForm = async (id: number) => {
  if (confirm('Ви впевнені, що хочете видалити цю форму?')) {
    await formsStore.deleteForm(id)
  }
}

// Utility functions
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

            const getFormName = (formId: number) => {
              const form = formsStore.forms.find(f => f.id === formId)
              return form ? form.name : 'Невідома форма'
            }

            const getFieldLabel = (formId: number, fieldId: string) => {
              const form = formsStore.forms.find(f => f.id === formId)
              if (!form) return fieldId
              
              const field = form.fields.find(f => f.id === fieldId)
              return field ? field.label : fieldId
            }

            const deleteSubmission = async (id: number) => {
  if (confirm('Ви впевнені, що хочете видалити це відправлення?')) {
    const result = await formsStore.deleteSubmission(id)
    if (!result.success) {
      alert('Помилка видалення відправлення: ' + result.error)
    }
  }
}
</script>
