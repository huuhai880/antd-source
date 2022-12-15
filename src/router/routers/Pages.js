import { lazy } from 'react'

const PagesRoutes = [
  {
    path: '/login',
    component: lazy(() => import('../../components/authentication/Login')),
    layout: 'BlankLayout',
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
  },
  {
    path: '/404',
    component: lazy(() => import('../../layouts/Error')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  }

]

export default PagesRoutes
