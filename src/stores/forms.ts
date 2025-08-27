import { defineStore } from 'pinia'
import { ref, computed, nextTick } from 'vue'
import axios from 'axios'

export interface FormField {
  id: string
  type: 'text' | 'email' | 'phone' | 'select' | 'checkbox' | 'file' | 'textarea'
  label: string
  required: boolean
  placeholder?: string
  options?: string[] // For select fields
  order: number
  hasInfo?: boolean // Show info icon
}

export interface Form {
  id: number
  name: string
  fields: FormField[]
  is_active: boolean | number | string
  created_at: string
}

export interface FormSubmission {
  id: number
  form_id: number
  submission: Record<string, any>
  created_at: string
  file_link?: string
}

export const useFormsStore = defineStore('forms', () => {
  const forms = ref<Form[]>([])
  const activeForm = ref<Form | null>(null)
  const submissions = ref<FormSubmission[]>([])
  const loading = ref(false)

  // Get active form
  const getActiveForm = computed(() => {
    console.log('getActiveForm computed called, activeForm.value:', activeForm.value)
    return activeForm.value
  })

  // Fetch all forms
  const fetchForms = async () => {
    try {
      loading.value = true
      const response = await axios.get('/api/forms')
      forms.value = response.data
      
      console.log('Fetched forms:', forms.value)
      
      // Set active form (handle boolean, number, and string values)
      console.log('Looking for active form in:', forms.value.length, 'forms')
      const active = forms.value.find(form => {
        const isActive = form.is_active
        console.log(`Form "${form.name}" is_active:`, isActive, 'type:', typeof isActive)
        const result = isActive === true || isActive === 1 || isActive === '1' || isActive === 'true'
        console.log(`Form "${form.name}" matches active criteria:`, result)
        return result
      })
      console.log('Active form found:', active)
      
      // Always clear first, then set
      activeForm.value = null
      
      if (active) {
        // Use nextTick to ensure the null value is processed first
        await nextTick()
        activeForm.value = { ...active } // Create new object to trigger reactivity
        console.log('activeForm.value set to:', activeForm.value)
      } else {
        console.log('activeForm.value set to null - no active form found')
      }
      
      // Force another reactivity update
      await nextTick()
      console.log('Final activeForm.value:', activeForm.value)
    } catch (error) {
      console.error('Failed to fetch forms:', error)
    } finally {
      loading.value = false
    }
  }

  // Create new form
  const createForm = async (formData: Omit<Form, 'id' | 'created_at'>) => {
    try {
      const response = await axios.post('/api/forms', formData)
      const newForm = response.data
      forms.value.push(newForm)
      
      if (newForm.is_active) {
        activeForm.value = newForm
        // Deactivate other forms
        forms.value.forEach(form => {
          if (form.id !== newForm.id) {
            form.is_active = false
          }
        })
      }
      
      return { success: true, form: newForm }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create form' 
      }
    }
  }

  // Update form
  const updateForm = async (id: number, formData: Partial<Form>) => {
    try {
      const response = await axios.put(`/api/forms/${id}`, formData)
      const updatedForm = response.data
      
      const index = forms.value.findIndex(form => form.id === id)
      if (index !== -1) {
        forms.value[index] = updatedForm
      }
      
      if (updatedForm.is_active) {
        activeForm.value = updatedForm
        // Deactivate other forms
        forms.value.forEach(form => {
          if (form.id !== id) {
            form.is_active = false
          }
        })
      }
      
      return { success: true, form: updatedForm }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update form' 
      }
    }
  }

  // Delete form
  const deleteForm = async (id: number) => {
    try {
      await axios.delete(`/api/forms/${id}`)
      forms.value = forms.value.filter(form => form.id !== id)
      
      if (activeForm.value?.id === id) {
        activeForm.value = null
      }
      
      return { success: true }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to delete form' 
      }
    }
  }

  // Activate form
  const activateForm = async (id: number) => {
    try {
      const response = await axios.patch(`/api/forms/${id}/activate`)
      const activatedForm = response.data
      
      // Update forms array
      forms.value.forEach(form => {
        form.is_active = form.id === id
      })
      
      activeForm.value = activatedForm
      return { success: true }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to activate form' 
      }
    }
  }

  // Fetch submissions
  const fetchSubmissions = async () => {
    try {
      loading.value = true
      const response = await axios.get('/api/submissions')
      submissions.value = response.data
    } catch (error) {
      console.error('Failed to fetch submissions:', error)
    } finally {
      loading.value = false
    }
  }

                // Submit form
              const submitForm = async (formId: number, data: Record<string, any>, file?: File) => {
                try {
                  const formData = new FormData()
                  formData.append('form_id', formId.toString())
                  formData.append('data', JSON.stringify(data))
                  
                  if (file) {
                    formData.append('file', file)
                  }
                  
                  const response = await axios.post('/api/submissions', formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  })
                  
                  return { success: true, submission: response.data }
                } catch (error: any) {
                  return { 
                    success: false, 
                    error: error.response?.data?.message || 'Failed to submit form' 
                  }
                }
              }

              // Delete submission
              const deleteSubmission = async (id: number) => {
                try {
                  await axios.delete(`/api/submissions/${id}`)
                  submissions.value = submissions.value.filter(submission => submission.id !== id)
                  return { success: true }
                } catch (error: any) {
                  return { 
                    success: false, 
                    error: error.response?.data?.message || 'Failed to delete submission' 
                  }
                }
              }

                return {
                forms,
                activeForm,
                submissions,
                loading,
                getActiveForm,
                fetchForms,
                createForm,
                updateForm,
                deleteForm,
                activateForm,
                fetchSubmissions,
                submitForm,
                deleteSubmission
              }
})
