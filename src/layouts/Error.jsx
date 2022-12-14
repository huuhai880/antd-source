import React from 'react';
import { Button, Result } from 'antd';
const Error = () => {

    return (
        <div style={{height:'100vh',width:'100vw'}}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">Back Home</Button>}
            />
        </div>
    )
}

export default Error
