// ** Icons Import
import { SettingOutlined, AppstoreOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export default [

    {
        key: '/dashboard',
        label: <Link to={'/dashboard'}>Dashboard</Link>,
        icon: <SettingOutlined />

    },
    {
        key: '/users',
        label: 'Nhân sự',
        icon: <SettingOutlined />,
        children: [
            {
                key: 'list',
                label: <Link to={'/user'}>Quản lý nhân viên</Link>,
                icon: <AppstoreOutlined />

            }
        ]
    }

]
