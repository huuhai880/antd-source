// ** React Imports
import React from 'react'
import '../style.scss'
import { Layout as LayoutAntd, Menu } from 'antd'
import { useSelector } from 'react-redux'
const { Sider } = LayoutAntd

const MenuLayout = ({menuData}) => {
    // ** Store Vars
    const layoutStore = useSelector(state => state.layout)
    // ** Vars
    const contentWidthMenu = layoutStore.contentWidthMenu
    const menuCollapsed = layoutStore.menuCollapsed

    return (
        <Sider
            width={contentWidthMenu}
            trigger={null}
            collapsible
            collapsed={menuCollapsed}
            style={{
                overflow: 'auto',
                height: '100vh',
                left: 0,
                top: 0,
                bottom: 0,
                borderRight: 0
            }} className="overflow_navbar">
            <div className="logo" style={{ width: contentWidthMenu }} />
            <Menu
                style={{ width: contentWidthMenu }}
                mode="inline"
                defaultSelectedKeys={['1']}
                items={menuData}
                theme="dark"
            />
        </Sider>

    )
}

export default MenuLayout
