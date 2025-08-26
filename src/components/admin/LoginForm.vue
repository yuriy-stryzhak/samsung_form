<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
                        <div class="text-center">
                    <h2 class="text-3xl font-bold text-gray-900">Вхід для адміністратора</h2>
                    <p class="mt-2 text-sm text-gray-600">
                      Увійдіть для доступу до панелі адміністратора
                    </p>
                  </div>
      
      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="space-y-4">
                                <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                          Email адреса
                        </label>
                        <input
                          id="email"
                          v-model="email"
                          type="email"
                          required
                          class="form-input mt-1"
                          placeholder="admin@example.com"
                        />
                      </div>
                      
                      <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">
                          Пароль
                        </label>
                        <input
                          id="password"
                          v-model="password"
                          type="password"
                          required
                          class="form-input mt-1"
                          placeholder="Введіть ваш пароль"
                        />
                      </div>
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full btn-hero disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
                                  <span v-if="loading" class="flex items-center justify-center">
                          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Вхід...
                        </span>
                        <span v-else class="flex items-center gap-2">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                          </svg>
                          Увійти
                        </span>
        </button>

                            <div class="text-center">
                      <p class="text-sm text-gray-600">
                        Contact administrator for access credentials
                      </p>
                    </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const result = await authStore.login(email.value, password.value)
    
    if (result.success) {
      router.push('/admin')
    } else {
      error.value = result.error
    }
  } catch (err) {
    error.value = 'Сталася неочікувана помилка'
  } finally {
    loading.value = false
  }
}
</script>
