<template>
  <div class="min-h-screen bg-background flex items-center justify-center">
    <div class="text-center">
      <div class="animate-fade-in">
        <h1 class="text-9xl font-bold text-primary-600 mb-4">404</h1>
                            <h2 class="text-3xl font-semibold text-foreground mb-4">Сторінку не знайдено</h2>
                    <p class="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                      Сторінка, яку ви шукаєте, не існує або була переміщена.
                    </p>
                    <router-link 
                      to="/" 
                      class="btn-hero"
                    >
                      На головну
                    </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 404 Not Found page
</script>
