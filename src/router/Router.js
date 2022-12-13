// ** React Imports
import { Suspense, lazy, Fragment } from 'react'

// ** Utils
// import { isUserLoggedIn } from '@utils'
import { useRouterTransition } from '../utils/hooks/useRouterTransition'

// ** Custom Components
import LayoutWrapper from '@src/layouts/LayoutWrapper'

// ** Router Components
import { BrowserRouter as AppRouter, Route, Routes as Switch, Navigate } from 'react-router-dom'

// ** Routes & Default Routes
import { DefaultRoute, Routes } from './routers'

// ** Layouts
import BlankLayout from '@src/layouts/BlankLayout'
import DefaultLayout from '@src/layouts/DefaultLayout'


const Router = () => {
    // ** Hooks

    const { transition, setTransition } = useRouterTransition()

    // ** Default Layout
    const _defaultLayout = 'DefaultLayout'

    // ** All of the available layouts
    const Layouts = { BlankLayout, DefaultLayout }

    // ** Current Active Item
    const currentActiveItem = null

    // ** Return Filtered Array of Routes & Paths
    const LayoutRoutesAndPaths = layout => {
        const LayoutRoutes = []
        const LayoutPaths = []

        if (Routes) {
            Routes.filter(route => {
                // ** Checks if Route layout or Default layout matches current layout
                if (route.layout === layout || (route.layout === undefined && _defaultLayout === layout)) {
                    LayoutRoutes.push(route)
                    LayoutPaths.push(route.path)
                }
            })
        }

        return { LayoutRoutes, LayoutPaths }
    }

    const NotAuthorized = lazy(() => import('@src/layouts/NotAuthorized'))

    // ** Init Error Component
    //const Error = lazy(() => import('@src/components/pages/misc/Error'))

    /**
     ** Final Route Component Checks for Login & User Role and then redirects to the route
     */
    const FinalRoute = props => {
        const route = props.route

        // if (
        //     (!isUserLoggedIn() && route.meta === undefined) ||
        //     (!isUserLoggedIn() && route.meta && !route.meta.authRoute && !route.meta.publicRoute)
        // ) {
        //     /**
        //      ** If user is not Logged in & route meta is undefined
        //      ** OR
        //      ** If user is not Logged in & route.meta.authRoute, !route.meta.publicRoute are undefined
        //      ** Then redirect user to login
        //      */

        //     return <Navigate to='/login' />
        // } else if (route.meta && route.meta.authRoute && isUserLoggedIn()) {
        //     // ** If route has meta and authRole and user is Logged in then redirect user to home page (DefaultRoute)
        //     return <Navigate to='/' />
        // } else {
        //     // ** If none of the above render component
        //     return <route.component {...props} />
        // }
        return <Navigate to='/' />
    }

    // ** Return Route to Render
    const ResolveRoutes = () => {

        return Object.keys(Layouts).map((layout, index) => {
            // ** Convert Layout parameter to Layout Component
            // ? Note: make sure to keep layout and component name equal

            const LayoutTag = Layouts[layout]

            // ** Get Routes and Paths of the Layout
            const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout)

            // ** We have freedom to display different layout for different route
            // ** We have made LayoutTag dynamic based on layout, we can also replace it with the only layout component,
            // ** that we want to implement like VerticalLayout or HorizontalLayout
            // ** We segregated all the routes based on the layouts and Resolved all those routes inside layouts

            // ** RouterProps to pass them to Layouts
            const routerProps = {}

            return (
                <Route path={LayoutPaths} key={index}>
                    <LayoutTag
                        layout={layout}
                        transition={transition}
                        routerProps={routerProps}
                        setTransition={setTransition}
                        currentActiveItem={currentActiveItem}
                    >
                        <Switch>
                            {LayoutRoutes.map(route => {
                                return (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        exact={route.exact === true}
                                        render={props => {
                                            // ** Assign props to routerProps
                                            Object.assign(routerProps, {
                                                ...props,
                                                meta: route.meta
                                            })

                                            return (
                                                <Fragment>
                                                    {/* Layout Wrapper to add classes based on route's layout, appLayout and className */}

                                                    {route.layout === 'BlankLayout' ? (
                                                        <Fragment>
                                                            <FinalRoute route={route} {...props} />
                                                        </Fragment>
                                                    ) : (
                                                        <LayoutWrapper
                                                            layout={DefaultLayout}
                                                            transition={transition}
                                                            setTransition={setTransition}
                                                            /* Conditional props */
                                                            /*eslint-disable */
                                                            {...(route.appLayout
                                                                ? {
                                                                    appLayout: route.appLayout
                                                                }
                                                                : {})}
                                                            {...(route.meta
                                                                ? {
                                                                    routeMeta: route.meta
                                                                }
                                                                : {})}
                                                            {...(route.className
                                                                ? {
                                                                    wrapperClass: route.className
                                                                }
                                                                : {})}
                                                        /*eslint-enable */
                                                        >
                                                            <Suspense fallback={null}>
                                                                <FinalRoute route={route} {...props} />
                                                            </Suspense>
                                                        </LayoutWrapper>

                                                    )}
                                                </Fragment>
                                            )
                                        }}
                                    />
                                )
                            })}
                        </Switch>
                    </LayoutTag>
                </Route>
            )
        })
    }

    return (
        <AppRouter basename={'/'}>
            <Switch>
                {/* If user is logged in Navigate user to DefaultRoute else to login */}
                <Route
                    exact
                    path='/'
                    render={() => {
                        // return isUserLoggedIn() ? <Navigate to={DefaultRoute} /> : <Navigate to='/login' />
                        return <Navigate to={'/login'} />
                    }}
                />
                {/* Not Auth Route */}
                <Route
                    exact
                    path='/not-authorized'
                    render={() => (
                        <Layouts.BlankLayout>
                            <NotAuthorized />
                        </Layouts.BlankLayout>
                    )}
                />
                {ResolveRoutes()}

                {/* NotFound Error page */}
                <Route path='*' component={Error} />
            </Switch>
        </AppRouter>
    )
}

export default Router
