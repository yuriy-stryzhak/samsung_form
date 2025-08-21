<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Show login form if not authenticated -->
    <LoginForm v-if="!authStore.isAuthenticated" />
    
    <!-- Show admin dashboard if authenticated -->
    <div v-else>
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <h1 class="text-2xl font-bold text-primary-600">Admin Dashboard</h1>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-gray-600">{{ authStore.user?.email }}</span>
              <button 
                @click="authStore.logout()"
                class="btn-ghost"
              >
                Logout
              </button>
              <router-link 
                to="/" 
                class="text-gray-600 hover:text-primary-600 transition-colors duration-200"
              >
                View Site
              </router-link>
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
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-900">Form Builder</h2>
            <button 
              @click="showCreateForm = true"
              class="btn-hero"
            >
              Create New Form
            </button>
          </div>

                                  <!-- Forms List -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div 
                            v-for="form in formsStore.forms" 
                            :key="form.id"
                            class="card-modern"
                          >
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-3">
                    <h3 class="text-lg font-semibold text-gray-900">{{ form.name }}</h3>
                    <span 
                      v-if="form.is_active"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      Active
                    </span>
                  </div>
                  <p class="text-gray-600 mb-4">
                    {{ form.fields.length }} field(s) • Created {{ formatDate(form.created_at) }}
                  </p>
                  <div class="flex space-x-2">
                    <button 
                      @click="editForm(form)"
                      class="btn-ghost"
                    >
                      Edit
                    </button>
                    <button 
                      v-if="!form.is_active"
                      @click="activateForm(form.id)"
                      class="btn-ghost"
                    >
                      Activate
                    </button>
                    <button 
                      @click="deleteForm(form.id)"
                      class="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Submissions Tab -->
        <div v-if="activeTab === 'submissions'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-900">Form Submissions</h2>
            <button 
              @click="formsStore.fetchSubmissions()"
              class="btn-ghost"
            >
              Refresh
            </button>
          </div>

          <!-- Submissions Table -->
          <div class="card-modern overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Form
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                                                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    File
                                  </th>
                                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
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
                                        <span class="font-medium text-gray-700">{{ key }}:</span>
                                        <span class="text-gray-600 ml-2">{{ value }}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <a 
                                      v-if="submission.file_link"
                                      :href="submission.file_link"
                                      target="_blank"
                                      class="text-primary-600 hover:text-primary-800 underline"
                                    >
                                      View File
                                    </a>
                                    <span v-else class="text-gray-400">No file</span>
                                  </td>
                                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <button 
                                      @click="deleteSubmission(submission.id)"
                                      class="text-red-600 hover:text-red-800 transition-colors duration-200 p-1"
                                      title="Delete submission"
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
import { ref, onMounted } from 'vue'
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

const tabs = [
  { id: 'forms', name: 'Form Builder' },
  { id: 'submissions', name: 'Submissions' }
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
  if (confirm('Are you sure you want to delete this form?')) {
    await formsStore.deleteForm(id)
  }
}

// Utility functions
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

            const getFormName = (formId: number) => {
              const form = formsStore.forms.find(f => f.id === formId)
              return form ? form.name : 'Unknown Form'
            }

            const deleteSubmission = async (id: number) => {
              if (confirm('Are you sure you want to delete this submission?')) {
                const result = await formsStore.deleteSubmission(id)
                if (!result.success) {
                  alert('Error deleting submission: ' + result.error)
                }
              }
            }
</script>
