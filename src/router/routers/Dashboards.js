import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/dashboard',
    component: lazy(() => import('../../components/dashboard/Dashboard')),
    meta: {
      publicRoute: true
    }
  }
]

export default DashboardRoutes
