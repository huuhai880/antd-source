import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/dashboard',
    component: lazy(() => import('../../components/dashboard/Dashboard')),
    exact: true
  }
]

export default DashboardRoutes
