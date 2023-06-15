
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
  },
  {
    path: '/clientArea',
    component: () => import('components/clientArea/indexClientArea.vue'),
  },
  {
    path: '/login',
    component: () => import('layouts/login/CompanyLogin.vue'),
  }
]

export default routes
