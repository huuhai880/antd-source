// ** Core Layout Import
// !Do not remove the Layout import
import Layout from './components'

// ** Menu Items Array
import navigation from '@src/navigation'

const DefaultLayout = props => {

  return (
    <Layout menuData={navigation} {...props}>
      DefaultLayout
      {props.children}
    </Layout>
  )
}

export default DefaultLayout
