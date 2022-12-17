import React from 'react'
import './style.scss'
import { Layout as LayoutAntd, Breadcrumb, theme } from 'antd'
import HeaderLayout from './header'
import MenuLayout from './menu'
const { Content, Footer } = LayoutAntd


const Layout = ({ menuData, children }) => {

  const { token: { colorBgContainer } } = theme.useToken()

  return (

    <LayoutAntd>
      <MenuLayout menuData={menuData} />
      <LayoutAntd>
        <HeaderLayout />
        <LayoutAntd style={{ padding: '0 8px 8px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 8,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer
            }}
          >
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </LayoutAntd>

      </LayoutAntd>
    </LayoutAntd>
  )
}
export default Layout