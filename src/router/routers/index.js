// ** Routes Imports
import PagesRoutes from './Pages'
import DashboardRoutes from './Dashboards'
// ** Default Route
const DefaultRoute = '/dashboard'

// ** Merge Routes
const Routes = [
    ...PagesRoutes,
    ...DashboardRoutes
]

export { DefaultRoute, Routes }
