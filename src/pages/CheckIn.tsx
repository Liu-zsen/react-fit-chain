import { useState } from 'react'
import { Upload, Button, Card, Progress, message } from 'antd'
import { UploadOutlined, CameraOutlined, CalendarOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'

export const CheckIn = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [todayChecked, setTodayChecked] = useState(false)

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      const isImage = file.type.indexOf('image/') === 0
      if (!isImage) {
        message.error('您只能上传图片文件!')
        return Upload.LIST_IGNORE
      }
      
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        message.error('图片必须小于5MB!')
        return Upload.LIST_IGNORE
      }
      
      setFileList([...fileList, file])
      return false
    },
    fileList,
  }

  const handleUpload = () => {
    if (fileList.length === 0) {
      message.warning('请先选择一张照片')
      return
    }

    setUploading(true)
    
    // 模拟上传过程
    setTimeout(() => {
      setUploading(false)
      setTodayChecked(true)
      setFileList([])
      message.success('打卡成功！获得 10 FIT 代币奖励')
    }, 2000)
  }

  const streakDays = 6  // 假设当前连续打卡天数

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">每日健身打卡</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="连续打卡" extra={<CalendarOutlined />}>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{streakDays}</div>
            <div className="text-gray-500 mb-4">连续天数</div>
            <Progress 
              percent={Math.round((streakDays / 7) * 100)} 
              strokeColor="#10B981"
              format={percent => `${percent}%`}
            />
            <div className="text-sm text-gray-400 mt-1">距离下一个奖励还有 {7 - streakDays} 天</div>
          </div>
        </Card>
        
        <Card title="今日奖励">
          <div className="text-center py-4">
            <div className="text-xl font-medium mb-2">
              {todayChecked ? '已获得 10 FIT' : '10 FIT'}
            </div>
            <Button 
              type="primary" 
              className={todayChecked ? 'bg-gray-400' : 'bg-primary'} 
              disabled={todayChecked}
            >
              {todayChecked ? '今日已打卡' : '立即打卡领取'}
            </Button>
          </div>
        </Card>
      </div>
      
      {!todayChecked ? (
        <Card title="上传健身照片" className="mb-6">
          <div className="text-center">
            <Upload
              {...uploadProps}
              listType="picture"
              maxCount={1}
              className="w-full mb-4"
            >
              <Button icon={<UploadOutlined />}>选择照片</Button>
            </Upload>
            <div className="text-gray-500 text-sm mb-4">
              上传一张您今日健身的照片作为打卡凭证，将获得 10 FIT 代币奖励。
            </div>
            <Button
              type="primary"
              onClick={handleUpload}
              loading={uploading}
              className="bg-primary"
            >
              {uploading ? '上传中...' : '打卡'}
            </Button>
            <div className="flex justify-center mt-4">
              <Button icon={<CameraOutlined />}>打开相机</Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="text-center py-8 border-green-500">
          <div className="text-2xl font-bold text-green-500 mb-4">今日打卡成功！</div>
          <p className="text-gray-600">明天继续坚持，连续打卡 7 天可获得额外 50 FIT 奖励。</p>
        </Card>
      )}
      
      <Card title="打卡规则" className="mt-6">
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>每日仅可打卡一次，上传健身照片即可获得 10 FIT 代币</li>
          <li>连续打卡 7 天可获得额外 50 FIT 奖励</li>
          <li>连续打卡 30 天将进入月度奖励池瓜分额外奖励</li>
          <li>系统会自动验证照片真实性，作弊行为将被取消奖励资格</li>
        </ul>
      </Card>
    </div>
  )
} 