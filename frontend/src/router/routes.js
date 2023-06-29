
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
  },
  {
    path: '/registerCompany',
    component: () => import('layouts/company/registerCompany.vue'),
  }
]

export default routes
