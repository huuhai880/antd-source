import React from 'react'
import './style.scss'
import { HomeOutlined } from '@ant-design/icons'
import { Layout as LayoutAntd, Breadcrumb, theme, Menu } from 'antd'
import HeaderLayout from './header'
import MenuLayout from './menu'
import { useSelector } from 'react-redux'
const { Header, Sider, Content } = LayoutAntd


const Layout = ({ children }) => {

  const { token: { colorBgContainer } } = theme.useToken()

  // ** Store Vars
  const layoutStore = useSelector(state => state.layout)
  // ** Vars
  const contentWidthMenu = layoutStore.contentWidthMenu

  return (

    <LayoutAntd>
      <HeaderLayout />
      <LayoutAntd>
        <MenuLayout />
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
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </LayoutAntd>
      </LayoutAntd>
    </LayoutAntd>
  )
}
export default Layout