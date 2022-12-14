// ** React Imports
import React from 'react'
import './style-navbar.scss'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Layout as LayoutAntd, theme, Avatar } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { handleMenuCollapsed } from '@store/layout'
import themeConfig from '@configs/themeConfig'


const { Header } = LayoutAntd
const NavbarLayout = () => {

    const { token: { colorBgContainer } } = theme.useToken()

    // ** Store Vars
    const dispatch = useDispatch()
    const layoutStore = useSelector(state => state.layout)
    // ** Vars
    const menuCollapsed = layoutStore.menuCollapsed

    // ** Toggles Menu Collapsed
    const setMenuCollapsed = val => dispatch(handleMenuCollapsed(val))

    return (
        <Header
            style={{
                padding: 0,
                background: colorBgContainer,
            }}
        >
            <div className='bw_body_header'>
                {React.createElement(menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setMenuCollapsed(!menuCollapsed)
                })}
                <Avatar src={themeConfig.app.appAvataDefault} />
            </div>
        </Header>

    )
}

export default NavbarLayout
