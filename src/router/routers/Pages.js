import { lazy } from 'react'

const PagesRoutes = [
  {
    path: '/',
    component: lazy(() => import('../../components/authentication/Login')),
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/not-authorized',
    component: lazy(() => import('../../layouts/NotAuthorized')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  }

]

export default PagesRoutes
