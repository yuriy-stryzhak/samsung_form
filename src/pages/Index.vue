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
    <!-- <section class="py-20 animate-gradient-hero relative">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-32 h-32 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
        <div class="absolute top-40 right-20 w-24 h-24 bg-primary-300 rounded-full opacity-15 animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute bottom-20 left-1/4 w-16 h-16 bg-primary-400 rounded-full opacity-25 animate-pulse" style="animation-delay: 2s;"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div class="animate-fade-in">
          <h1 class="text-5xl md:text-7xl font-bold text-foreground mb-6">
            Innovation That <br>
            <span class="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              Inspires
            </span>
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Experience the future of technology with Samsung's cutting-edge solutions designed to enhance your digital lifestyle.
          </p>
          <button 
            @click="scrollToForm"
            class="btn-hero animate-scale-in"
          >
            Почати
          </button>
        </div>
      </div>
    </section> -->

    <!-- Form Section -->
    <section id="form-section" class="py-20 animate-gradient-hero">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-foreground mb-4">
            Прийняти участь
          </h2>
          <p class="text-lg text-gray-600">
            Заповніть форму нижче
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
          <h3 class="text-xl font-semibold text-gray-600 mb-2">Немає активної форми</h3>
          <p class="text-gray-500">
            Зверніться до адміністратора для налаштування форми для цієї сторінки.
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
import { onMounted, computed } from 'vue'
import { useFormsStore } from '@/stores/forms'
import LandingForm from '@/components/LandingForm.vue'

const formsStore = useFormsStore()
const { fetchForms } = formsStore

// Use computed to ensure reactivity
const activeForm = computed(() => {
  return formsStore.activeForm
})

// Fetch forms on component mount
onMounted(async () => {
  await fetchForms()
})

// Refresh forms manually
// const refreshForms = async () => {
//   await fetchForms()
// }

// Scroll to form section
// const scrollToForm = () => {
//   const formSection = document.getElementById('form-section')
//   if (formSection) {
//     formSection.scrollIntoView({ behavior: 'smooth' })
//   }
// }
</script>
