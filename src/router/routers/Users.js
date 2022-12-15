import { lazy } from 'react'

const UsersRoutes = [
  {
    path: '/user',
    component: lazy(() => import('../../components/user/User')),
    meta: {
      publicRoute: true
    }
  }
]

export default UsersRoutes
