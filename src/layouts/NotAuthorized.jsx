import React from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

const NotAuthorized = () => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Result
        status="403"
        title="403"
        subTitle="Xin lỗi, bạn không được phép truy cập trang này."
        extra={<Link to="/">
          <Button type="primary">Quay lại</Button>
        </Link>}
      />
    </div>
  )
}

export default NotAuthorized
