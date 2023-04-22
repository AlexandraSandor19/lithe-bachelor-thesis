import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import HomeView from '../views/HomeView.vue';
import LogInView from '../views/LogInView.vue';
import SignUpView from '../views/SignUpView.vue';
import ProfileView from '../views/ProfileView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/log-in',
      name: 'login',
      component: LogInView,
      meta: {requiresGuest: true}
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: SignUpView,
      meta: {requiresGuest: true}
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {requiresAuth: true}
    }
  ]
});

router.beforeResolve(async (to, from, next)=>{
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {   
    return next({name: 'login', query: {redirect: to.fullPath}});
  } else if(to.meta.requiresGuest && authStore.isAuthenticated) {
    return next({name: 'home'});
  } else {
    return next();
  }
})

export default router;
