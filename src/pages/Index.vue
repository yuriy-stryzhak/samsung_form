<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-3xl font-bold text-primary-600">Samsung</h1>
          </div>
          <!-- <nav class="flex space-x-8">
            <router-link 
              to="/admin" 
              class="text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              Admin Panel
            </router-link>
          </nav> -->
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="animate-fade-in">
          <h1 class="text-5xl md:text-7xl font-bold text-foreground mb-6">
            Dynamic
            <span class="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              Form Builder
            </span>
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Create and manage professional forms with ease. Our platform supports multiple field types, 
            file uploads, and seamless Google integrations.
          </p>
          <button 
            @click="scrollToForm"
            class="btn-hero animate-scale-in"
          >
            Get Started
          </button>
        </div>
        
        <!-- Visual Element -->
        <div class="mt-16 animate-slide-up">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-primary-100 rounded-full">
            <svg class="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Section -->
    <section id="form-section" class="py-20 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-foreground mb-4">
            Contact Us
          </h2>
          <p class="text-lg text-gray-600">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

                    <!-- Dynamic Form -->
                    <div v-if="activeForm" class="animate-fade-in">
                      <LandingForm :form="activeForm" />
                    </div>
                    
                    <!-- No Active Form Message -->
                    <div v-else class="text-center py-12">
                      <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <h3 class="text-xl font-semibold text-gray-600 mb-2">No Active Form</h3>
                      <p class="text-gray-500">
                        Please contact an administrator to set up a form for this page.
                      </p>
                    </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-50 border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <p class="text-gray-600">
            © 2025 Samsung. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { useFormsStore } from '@/stores/forms'
import LandingForm from '@/components/LandingForm.vue'

const formsStore = useFormsStore()
const { fetchForms } = formsStore

// Use computed to ensure reactivity
const activeForm = computed(() => {
  console.log('Index.vue: activeForm computed called, value:', formsStore.activeForm)
  return formsStore.activeForm
})

// Watch for changes in activeForm
watch(activeForm, (newValue, oldValue) => {
  console.log('Index.vue: activeForm changed from', oldValue, 'to', newValue)
}, { immediate: true })

// Fetch forms on component mount
onMounted(async () => {
  console.log('Index.vue: Fetching forms...')
  await fetchForms()
  console.log('Index.vue: activeForm after fetch:', activeForm)
  console.log('Index.vue: formsStore.forms:', formsStore.forms)
  console.log('Index.vue: formsStore.forms.map(f => ({ name: f.name, is_active: f.is_active, type: typeof f.is_active })):', 
    formsStore.forms.map(f => ({ name: f.name, is_active: f.is_active, type: typeof f.is_active }))
  )
})

// Refresh forms manually
const refreshForms = async () => {
  console.log('Manual refresh triggered')
  await fetchForms()
}

// Scroll to form section
const scrollToForm = () => {
  const formSection = document.getElementById('form-section')
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
