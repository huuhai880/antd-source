// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** ThemeConfig Import
import themeConfig from '@configs/themeConfig'

const initialMenuCollapsed = () => {
  const item = window.localStorage.getItem('menuCollapsed')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    menuCollapsed: initialMenuCollapsed(),
    navbarType: themeConfig.layout.navbar.type,
    menuHidden: themeConfig.layout.menu.isHidden,
    contentWidth: themeConfig.layout.contentWidth,
    routerTransition: themeConfig.layout.routerTransition,
  },
  reducers: {


    handleLayout: (state, action) => {
      state.layout = action.payload
    },

    handleNavbarType: (state, action) => {
      state.navbarType = action.payload
    },
    handleMenuHidden: (state, action) => {
      state.menuHidden = action.payload
    },
    handleContentWidth: (state, action) => {
      state.contentWidth = action.payload
    },
    handleMenuCollapsed: (state, action) => {
      state.menuCollapsed = action.payload
      window.localStorage.setItem('menuCollapsed', JSON.stringify(action.payload))
    },
    handleRouterTransition: (state, action) => {
      state.routerTransition = action.payload
    }
  }
})

export const {
  handleLayout,
  handleMenuHidden,
  handleNavbarType,
  handleContentWidth,
  handleMenuCollapsed,
  handleRouterTransition
} = layoutSlice.actions

export default layoutSlice.reducer
