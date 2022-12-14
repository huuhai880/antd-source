// ** React Imports
import React from 'react'
import '../style.scss'
import { AppstoreOutlined, MailOutlined, SettingOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Layout as LayoutAntd, Menu } from 'antd'
import { useSelector } from 'react-redux'
const { Sider } = LayoutAntd


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type
    }
}

const items = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
        getItem('Item 1', 'g1', <SettingOutlined />, [getItem('Option 1', '1'), getItem('Option 2', '2')]),
        getItem('Item 2', 'g2', <SettingOutlined />, [getItem('Option 3', '3'), getItem('Option 4', '4')])
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        getItem('Option 5', '5', <AppstoreOutlined />),
        getItem('Option 6', '6', <AppstoreOutlined />),
        getItem('Submenu', 'sub3', <SettingOutlined />, [
            getItem('Option 7', '7', <PlusCircleOutlined />),
            getItem('Option 8', '8', <PlusCircleOutlined />, [
                getItem('Option 71', '71', <PlusCircleOutlined />),
                getItem('Option 81', '81', <PlusCircleOutlined />, [
                    getItem('Option 7', '7', <PlusCircleOutlined />),
                    getItem('Option 8', '8', <PlusCircleOutlined />)
                ])
            ])
        ])
    ]),
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9', <PlusCircleOutlined />),
        getItem('Option 10', '10', <PlusCircleOutlined />),
        getItem('Option 11', '11', <PlusCircleOutlined />),
        getItem('Option 12', '12', <PlusCircleOutlined />)
    ]),
    getItem('Navigation Three', 'sub5', <SettingOutlined />, [
        getItem('Option 9', '9', <PlusCircleOutlined />),
        getItem('Option 10', '10', <PlusCircleOutlined />),
        getItem('Option 11', '11', <PlusCircleOutlined />),
        getItem('Option 12', '12', <PlusCircleOutlined />)
    ]),

]

const MenuLayout = () => {
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
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                borderRight: 0
            }} className="overflow_navbar">
            <div className="logo" />
            <Menu
                style={{ width: contentWidthMenu }}
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
            />
        </Sider>

    )
}

export default MenuLayout
