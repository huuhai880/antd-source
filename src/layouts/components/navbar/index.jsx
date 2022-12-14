// ** React Imports
import React, { useState, useEffect } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout as LayoutAntd, Menu, theme } from 'antd';
const { Sider } = LayoutAntd;

const NavbarLayout = ({ collapsed }) => {

    return (
        <Sider trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
            }}
        >
            <div
                style={{
                    height: 32,
                    margin: 16,
                    background: 'rgba(255, 255, 255, 0.2)',
                }}
            />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: 'nav 1',
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: 'nav 2',
                    },
                    {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: 'nav 3',
                    },
                ]}
            />
        </Sider>

    )
}

export default NavbarLayout
