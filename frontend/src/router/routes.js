
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
  },
  {
    path: '/clientArea',
    component: () => import('components/clientArea/indexClientArea.vue'),
  }
]

export default routes
