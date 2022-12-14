// ** React Imports
import { useState, useEffect } from 'react'

const Layout = props => {

  const {
    menu,
    navbar,
    footer,
    menuData,
    children,
    routerProps,
    setLastLayout,
    currentActiveItem
  } = props

  // ** States
  const [isMounted, setIsMounted] = useState(false)

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])


  if (!isMounted) {
    return null
  }
  return (
    <div>
      main layout
      {children}
    </div>
  )
}

export default Layout
