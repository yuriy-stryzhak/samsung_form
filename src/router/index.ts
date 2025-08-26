import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Index from '@/pages/Index.vue'
import Admin from '@/pages/Admin.vue'
import NotFound from '@/pages/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: { public: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { public: false }
  },
  {
    path: '/admin/submissions',
    name: 'AdminSubmissions',
    component: Admin,
    meta: { public: false }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { public: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  // Always allow access to admin page (it will handle authentication internally)
  if (to.path === '/admin') {
    next()
    return
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    // Get token from localStorage directly
    const token = localStorage.getItem('token')
    if (!token) {
      // Redirect to home page
      next('/')
      return
    }
    next()
  } else {
    next()
  }
})

export default router
