// ** Core Layout Import
// !Do not remove the Layout import
import Layout from './components/DefaultLayout'

// ** Menu Items Array
import navigation from '@src/navigation'

const VerticalLayout = props => {
  
  return (
    <Layout menuData={navigation} {...props}>
      {props.children}
    </Layout>
  )
}

export default VerticalLayout
