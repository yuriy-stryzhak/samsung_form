<template>
  <div class="min-h-screen bg-background flex items-center justify-center">
    <div class="text-center">
      <div class="animate-fade-in">
        <h1 class="text-9xl font-bold text-primary-600 mb-4">404</h1>
        <h2 class="text-3xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p class="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <router-link 
          to="/" 
          class="btn-hero"
        >
          Go Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 404 Not Found page
</script>
