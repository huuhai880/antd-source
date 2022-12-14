// ** React Imports
import React, { useState, useEffect } from 'react';
import './style.scss';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Layout as LayoutAntd, Menu, theme } from 'antd';
import NavbarLayout from './navbar';
const { Header, Sider, Content } = LayoutAntd;

const Layout = ({ menu, navbar, footer, menuData, children, routerProps, setLastLayout, currentActiveItem }) => {

  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();

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
    <LayoutAntd>
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
      <LayoutAntd className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: '5vh'
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          style={{
            margin: '8px',
            padding: 8,
            height: '91vh',
            background: '#DEDEDE',
          }}>
          {children}
        </Content>
      </LayoutAntd>


    </LayoutAntd>
  )
}

export default Layout
