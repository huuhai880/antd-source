import React from 'react'
import './style.scss'
import { HomeOutlined } from '@ant-design/icons'
import { Layout as LayoutAntd, Breadcrumb, theme, Menu } from 'antd'
import NavbarLayout from './navbar'
import MenuLayout from './menu'
import { useSelector } from 'react-redux'
const {Header,Sider, Content } = LayoutAntd


const Layout = ({ children }) => {

  const { token: { colorBgContainer } } = theme.useToken()

  // ** Store Vars
  const layoutStore = useSelector(state => state.layout)
  // ** Vars
  const contentWidthMenu = layoutStore.contentWidthMenu

  return (

    <LayoutAntd>
      <Header className="header">
        <div className="logo" />
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
      </Header>
      <LayoutAntd>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={[]}
          />
        </Sider>
        <LayoutAntd style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Content
          </Content>
        </LayoutAntd>
      </LayoutAntd>
    </LayoutAntd>

    // <LayoutAntd className='home_body'>

    //   <NavbarLayout />

    //   <LayoutAntd >

    //     <MenuLayout />

    //     <LayoutAntd style={{ marginLeft: contentWidthMenu }}>
    //       <Breadcrumb style={{ margin: '16px' }}>
    //         <Breadcrumb.Item href="/dashboard">
    //           <HomeOutlined />
    //         </Breadcrumb.Item>
    //         <Breadcrumb.Item href="">
    //           <span>Application List</span>
    //         </Breadcrumb.Item>
    //         <Breadcrumb.Item>Application</Breadcrumb.Item>
    //       </Breadcrumb>
    //       <Content
    //         style={{
    //           padding: 16,
    //           minHeight: '100vh',
    //           background: colorBgContainer,
    //           margin: '24px 16px 0'
    //         }}>
    //         {children}
    //       </Content>
    //     </LayoutAntd>
    //   </LayoutAntd>
    // </LayoutAntd>
  )
}
export default Layout