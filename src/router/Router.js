// ** React Imports
import { Suspense, lazy, Fragment } from 'react'

// ** Utils
// import { isUserLoggedIn } from '@utils'
import { useLayout } from '@hooks/useLayout'
import { useRouterTransition } from '@hooks/useRouterTransition'

// ** Custom Components
// import LayoutWrapper from '@layouts/components/layout-wrapper'

// ** Router Components
import { BrowserRouter as AppRouter, Route, Switch, Redirect } from 'react-router-dom'

// ** Routes & Default Routes
import { DefaultRoute, Routes } from './routes'

// ** Layouts
import BlankLayout from '@src/layouts/BlankLayout'
import DefaultLayout from '@src/layouts/DefaultLayout'


const Router = () => {
    // ** Hooks
    const { setLayout, setLastLayout } = useLayout()
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

    //const NotAuthorized = lazy(() => import('@src/components/pages/misc/NotAuthorized'))

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

        //     return <Redirect to='/login' />
        // } else if (route.meta && route.meta.authRoute && isUserLoggedIn()) {
        //     // ** If route has meta and authRole and user is Logged in then redirect user to home page (DefaultRoute)
        //     return <Redirect to='/' />
        // } else {
        //     // ** If none of the above render component
        //     return <route.component {...props} />
        // }
        return <Redirect to='/' />
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
                        setLayout={setLayout}
                        transition={transition}
                        routerProps={routerProps}
                        setLastLayout={setLastLayout}
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
                                                        // <LayoutWrapper
                                                        //     layout={_defaultLayout}
                                                        //     transition={transition}
                                                        //     setTransition={setTransition}
                                                        //     /* Conditional props */
                                                        //     /*eslint-disable */
                                                        //     {...(route.appLayout
                                                        //         ? {
                                                        //             appLayout: route.appLayout
                                                        //         }
                                                        //         : {})}
                                                        //     {...(route.meta
                                                        //         ? {
                                                        //             routeMeta: route.meta
                                                        //         }
                                                        //         : {})}
                                                        //     {...(route.className
                                                        //         ? {
                                                        //             wrapperClass: route.className
                                                        //         }
                                                        //         : {})}
                                                        // /*eslint-enable */
                                                        // >
                                                        //     <Suspense fallback={null}>
                                                        //         <FinalRoute route={route} {...props} />
                                                        //     </Suspense>
                                                        // </LayoutWrapper>
                                                        <Suspense fallback={null}>
                                                            <FinalRoute route={route} {...props} />
                                                        </Suspense>
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
        <AppRouter basename={process.env.REACT_APP_BASENAME}>
            <Switch>
                {/* If user is logged in Redirect user to DefaultRoute else to login */}
                <Route
                    exact
                    path='/'
                    render={() => {
                        return isUserLoggedIn() ? <Redirect to={DefaultRoute} /> : <Redirect to='/login' />
                    }}
                />
                {/* Not Auth Route */}
                <Route
                    exact
                    path='/misc/not-authorized'
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
