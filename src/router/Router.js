// ** React Imports
import { Suspense, lazy, Fragment } from 'react'

// ** Utils
// import { isUserLoggedIn } from '@utils'
import { useRouterTransition } from '@hooks/useRouterTransition'

// ** Custom Components
import LayoutWrapper from '@src/layouts/LayoutWrapper'

// ** Router Components
import { BrowserRouter as AppRouter, Route, Switch, Redirect } from 'react-router-dom'

// ** Routes & Default Routes
import { DefaultRoute, Routes } from './routers'

// ** Layouts
import BlankLayout from '@src/layouts/BlankLayout'
import VerticalLayout from '@src/layouts/DefaultLayout'


const Router = () => {
  // ** Hooks
  const { transition, setTransition } = useRouterTransition()

  // ** Default Layout
  const DefaultLayout = 'VerticalLayout'

  // ** All of the available layouts
  const Layouts = { BlankLayout, VerticalLayout }

  // ** Current Active Item
  const currentActiveItem = null

  // ** Return Filtered Array of Routes & Paths
  const LayoutRoutesAndPaths = layout => {
    const LayoutRoutes = []
    const LayoutPaths = []

    if (Routes) {
      
      Routes.filter(route => {
        // ** Checks if Route layout or Default layout matches current layout
        if (route.layout === layout || (route.layout === undefined && DefaultLayout === layout)) {
          LayoutRoutes.push(route)
          LayoutPaths.push(route.path)
        }
      })
    }

    return { LayoutRoutes, LayoutPaths }
  }

  const NotAuthorized = lazy(() => import('@src/layouts/NotAuthorized'))

  /**
   ** Final Route Component Checks for Login & User Role and then redirects to the route
   */
  const FinalRoute = props => {
    const route = props.route

    if (route.meta && route.meta.authRoute) {
      // ** If route has meta and authRole and user is Logged in then redirect user to home page (DefaultRoute)
      return <Redirect to='/' />
    } else {
      // ** If none of the above render component
      return <route.component {...props} />
    }
  }

  // ** Return Route to Render
  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {

      const LayoutTag = Layouts[layout]

      // ** Get Routes and Paths of the Layout
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout)

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
                          {route.layout === 'BlankLayout' ? (
                            <Fragment>
                              <FinalRoute route={route} {...props} />
                            </Fragment>
                          ) : (
                            <LayoutWrapper
                              layout={DefaultLayout}
                              transition={transition}
                              setTransition={setTransition}
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
        {/* If user is logged in Redirect user to DefaultRoute else to login */}
        <Route
          exact
          path='/'
          render={() => {
            return <Redirect to={DefaultRoute} />
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
        <Route path='*' render={() => {
          return <Redirect to={'/404'} />
        }} />
      </Switch>
    </AppRouter>
  )
}

export default Router
