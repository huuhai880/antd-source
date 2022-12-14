// ** React Imports
import React, { useState, useEffect } from 'react';
import './style.scss'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
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
      <NavbarLayout collapsed={collapsed} />
      <LayoutAntd className="site-layout" style={{ marginLeft: 200 }}>
        <Header style={{
          padding: 0, background: colorBgContainer, height: '5vh'
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
            overflow: 'initial'
          }}>
          {children}
        </Content>
      </LayoutAntd>
    </LayoutAntd>
  )
}

export default Layout
