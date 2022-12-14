import React from 'react'
import './style.scss'
import { HomeOutlined } from '@ant-design/icons'
import { Layout as LayoutAntd, Breadcrumb, theme } from 'antd'
import NavbarLayout from './navbar'
import MenuLayout from './menu'
import { useSelector } from 'react-redux'
const { Content } = LayoutAntd


const Layout = ({ children }) => {

  const { token: { colorBgContainer } } = theme.useToken()

  // ** Store Vars
  const layoutStore = useSelector(state => state.layout)
  // ** Vars
  const contentWidthMenu = layoutStore.contentWidthMenu

  return (
    <LayoutAntd className='home_body'>
      <MenuLayout />
      <LayoutAntd className="site-layout" style={{ marginLeft: contentWidthMenu }}>
        <NavbarLayout />

        <Breadcrumb style={{ margin: '16px' }}>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span>Application List</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Application</Breadcrumb.Item>
        </Breadcrumb>

        <Content
          style={{
            padding: 16,
            minHeight: '86vh',
            background: colorBgContainer
          }}>
          {children}
        </Content>
      </LayoutAntd>
    </LayoutAntd>
  )
}
export default Layout