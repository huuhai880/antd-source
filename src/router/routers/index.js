// ** Routes Imports
import PagesRoutes from './Pages'
import DashboardRoutes from './Dashboards'
import UsersRoutes from './Users'
// ** Default Route
const DefaultRoute = '/dashboard'

// ** Merge Routes
const Routes = [
    ...PagesRoutes,
    ...DashboardRoutes,
    ...UsersRoutes
]

export { DefaultRoute, Routes }
