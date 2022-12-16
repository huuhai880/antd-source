// ** React Imports
import React from 'react'
import '../style.scss'
import { AppstoreOutlined, MailOutlined, SettingOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Layout as LayoutAntd, Menu } from 'antd'
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
const { Sider } = LayoutAntd

const items = [
    {
        key: '/dashboard',
        label: <Link to={'/dashboard'}>Dashboard</Link>,
        icon: <SettingOutlined />,
        
    },
    {
        key: '/users',
        label: 'Nhân sự',
        icon: <SettingOutlined />,
        children: [
            {
                key: 'list',
                label: <Link to={'/user'}>Quản lý nhân viên</Link>,
                icon: <AppstoreOutlined />,
                
            }
        ]
    }

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
                theme="dark"
            />
        </Sider>

    )
}

export default MenuLayout
