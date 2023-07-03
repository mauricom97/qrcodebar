
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
  },
  {
    path: '/login',
    component: () => import('layouts/login/CompanyLogin.vue'),
  },
  {
    path: '/registerCompany',
    component: () => import('layouts/company/registerCompany.vue'),
  },
  {
    path: '/dashborad',
    component: () => import('layouts/dashboard/IndexDashboard.vue'),
  },
  {
    path: '/clientArea',
    component: () => import('components/clientArea/indexClientArea.vue'),
  },
]

export default routes
