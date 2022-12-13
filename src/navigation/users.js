// ** Icons Import
import { UserOutlined } from '@ant-design/icons';

export default [

    {
        id: 'users',
        title: 'Nhân sự',
        icon: <UserOutlined />,
        children: [
            {
                id: 'list',
                title: 'Quản lý nhân viên',
                icon: <UserOutlined />,
                navLink: '/user/list'
            }
        ]
    }
]
