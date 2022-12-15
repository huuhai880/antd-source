import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const Error = () => {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
                extra={<Link to="/">
                    <Button type="primary">Quay lại</Button>
                </Link>}
            />
        </div>
    )
}

export default Error
