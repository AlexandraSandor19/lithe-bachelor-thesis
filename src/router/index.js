import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import HomeView from '../views/HomeView.vue'
import LogInView from '../views/LogInView.vue'
import SignUpView from '../views/SignUpView.vue'
import ProfileView from '../views/ProfileView.vue'
import ProjectView from '../views/ProjectView.vue'
import IssueView from '../views/IssueView.vue'
import BoardView from '../views/BoardView.vue'
import TeamsView from '../views/TeamsView.vue'
import TeamDetailsView from '../views/TeamDetailsView.vue'
import ProjectDetailsView from '../views/ProjectDetailsView.vue'
import IssueDetailsView from '../views/IssueDetailsView.vue';
import BacklogView from '../views/BacklogView.vue'

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
      meta: { requiresGuest: true }
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: SignUpView,
      meta: { requiresGuest: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/projects',
      name: 'project',
      component: ProjectView,
      meta: { requiresAuth: true }
    },
    {
      path: '/projects/:id',
      name: 'project-details',
      component: ProjectDetailsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/issues',
      name: 'issue',
      component: IssueView,
      meta: { requiresAuth: true }
    },
    {
      path: '/board/:id',
      name: 'board',
      component: BoardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/teams',
      name: 'teams',
      component: TeamsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/teams/:id',
      name: 'team-details',
      component: TeamDetailsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/issues/:id',
      name: 'issue-details',
      component: IssueDetailsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/backlog/:id',
      name: 'team-backlog',
      component: BacklogView,
      meta: { requiresAuth: true }
    },    
  ]
})

router.beforeResolve(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next({ name: 'home' })
  } else {
    return next()
  }
})

export default router
