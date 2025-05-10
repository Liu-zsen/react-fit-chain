import React from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你访问的页面不存在。"
      extra={
        <Link to="/">
          <Button type="primary" className="bg-primary">
            返回首页
          </Button>
        </Link>
      }
    />
  )
} 