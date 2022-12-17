// ** React Imports
import React from 'react'
import './style-navbar.scss'
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import { Layout as LayoutAntd, theme, Avatar, Dropdown } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { handleMenuCollapsed } from '@store/layout'
import themeConfig from '@configs/themeConfig'
const { Header } = LayoutAntd

const items = [
    {
        key: '1',
        label: (
            <span>
                Cài đặt
            </span>
        ),
        icon: <SettingOutlined />
    },
    {
        key: '2',
        label: (
            <span >
                Đăng xuất
            </span>
        ),
        icon: <LogoutOutlined />
    },

]

const HeaderLayout = () => {

    const { token: { colorBgContainer } } = theme.useToken()

    // ** Store Vars
    const dispatch = useDispatch()
    const layoutStore = useSelector(state => state.layout)
    // ** Vars
    const menuCollapsed = layoutStore.menuCollapsed
    // ** Toggles Menu Collapsed
    const setMenuCollapsed = val => dispatch(handleMenuCollapsed(val))

    return (

        <Header style={{ padding: '0px 16px 0px 0px', backgroundColor: colorBgContainer, position: 'sticky', top: 0, zIndex: 1, width: '100%'  }}>
            
            <div className='bw_body_header'>
                {React.createElement(menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setMenuCollapsed(!menuCollapsed)
                })}
                <div>
                    <Dropdown menu={{ items }} overlayStyle={{ width: 150, textAlign: 'center' }}>
                        <Avatar size={40} src={themeConfig.app.appAvataDefault} />
                    </Dropdown>
                </div>
            </div>
        </Header>

    )
}

export default HeaderLayout
