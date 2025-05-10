import React, { useState } from 'react'
import { Tabs, Card, Button, Statistic, Progress, Avatar, List, Tag, Empty, Form, Input, message } from 'antd'
import type { TabsProps } from 'antd'
import { 
  CalendarOutlined, 
  TrophyOutlined, 
  WalletOutlined, 
  UserOutlined, 
  SettingOutlined,
  CopyOutlined,
  EditOutlined,
  TeamOutlined,
  LogoutOutlined
} from '@ant-design/icons'

const { TextArea } = Input

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()
  
  // 模拟用户数据
  const user = {
    name: '健身爱好者',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    walletAddress: '0x1a2b3c...4d5e6f',
    bio: '热爱健身3年，专注力量训练，希望在平台上认识更多志同道合的朋友。',
    streak: 18,
    longestStreak: 32,
    totalCheckins: 145,
    fitBalance: 2450,
    rank: 42,
    level: 8,
    badges: [
      { id: '1', name: '连续打卡7天', date: '2025-04-15' },
      { id: '2', name: '邀请5位好友', date: '2025-04-22' },
      { id: '3', name: '首次知识分享', date: '2025-04-30' },
    ],
    following: 28,
    followers: 15,
    activities: [
      { id: '1', type: 'checkin', date: '2025-05-10', reward: 10, description: '完成每日打卡' },
      { id: '2', type: 'streak', date: '2025-05-03', reward: 50, description: '连续打卡7天奖励' },
      { id: '3', type: 'knowledge', date: '2025-04-30', reward: 20, description: '发布健身知识文章' },
      { id: '4', type: 'vote', date: '2025-04-28', reward: 5, description: '参与社区投票' },
      { id: '5', type: 'invite', date: '2025-04-22', reward: 50, description: '邀请新用户注册' },
    ]
  }

  const handleEditProfile = () => {
    setIsEditing(true)
    form.setFieldsValue({
      name: user.name,
      bio: user.bio
    })
  }

  const handleSaveProfile = () => {
    form.validateFields()
      .then(values => {
        console.log('保存个人资料:', values)
        message.success('个人资料更新成功')
        setIsEditing(false)
      })
      .catch(info => {
        console.log('表单验证失败:', info)
      })
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(user.walletAddress)
      .then(() => message.success('钱包地址已复制'))
  }

  const tabItems: TabsProps['items'] = [
    {
      key: 'activities',
      label: '活动记录',
      children: (
        <List
          itemLayout="horizontal"
          dataSource={user.activities}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.description}
                description={item.date}
              />
              <div className="text-green-600 font-medium">+{item.reward} FIT</div>
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 'badges',
      label: '成就徽章',
      children: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {user.badges.map(badge => (
            <Card key={badge.id} size="small">
              <div className="flex flex-col items-center py-2">
                <TrophyOutlined className="text-2xl text-yellow-500 mb-2" />
                <div className="font-medium">{badge.name}</div>
                <div className="text-xs text-gray-500">{badge.date}</div>
              </div>
            </Card>
          ))}
        </div>
      ),
    },
    {
      key: 'following',
      label: '我的关注',
      children: <Empty description="暂无关注数据" />,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 flex flex-col items-center space-y-4">
            <Avatar size={100} src={user.avatar} icon={<UserOutlined />} />
            {!isEditing ? (
              <>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <div className="text-gray-500">等级 {user.level}</div>
                <Button 
                  type="primary" 
                  icon={<EditOutlined />} 
                  onClick={handleEditProfile}
                  className="bg-primary"
                >
                  编辑资料
                </Button>
              </>
            ) : (
              <div className="w-full mt-4">
                <Form form={form} layout="vertical">
                  <Form.Item
                    name="name"
                    label="用户名"
                    rules={[{ required: true, message: '请输入用户名' }]}
                  >
                    <Input placeholder="用户名" />
                  </Form.Item>
                  <Form.Item
                    name="bio"
                    label="个人简介"
                  >
                    <TextArea rows={3} placeholder="个人简介" />
                  </Form.Item>
                  <div className="flex space-x-2">
                    <Button 
                      type="primary" 
                      onClick={handleSaveProfile}
                      className="bg-primary"
                    >
                      保存
                    </Button>
                    <Button onClick={handleCancelEdit}>
                      取消
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </div>
          
          <div className="md:w-3/4 md:pl-6 mt-6 md:mt-0">
            {!isEditing && (
              <>
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">个人简介</h3>
                  <p className="text-gray-600">{user.bio}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">钱包信息</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">{user.walletAddress}</span>
                    <Button 
                      type="text" 
                      icon={<CopyOutlined />} 
                      size="small"
                      onClick={handleCopyAddress}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <Card size="small">
                    <Statistic
                      title="连续打卡"
                      value={user.streak}
                      suffix="天"
                      prefix={<CalendarOutlined />}
                    />
                  </Card>
                  <Card size="small">
                    <Statistic
                      title="总打卡数"
                      value={user.totalCheckins}
                      prefix={<CalendarOutlined />}
                    />
                  </Card>
                  <Card size="small">
                    <Statistic
                      title="FIT余额"
                      value={user.fitBalance}
                      prefix={<WalletOutlined />}
                      valueStyle={{ color: '#3f8600' }}
                    />
                  </Card>
                  <Card size="small">
                    <Statistic
                      title="排名"
                      value={user.rank}
                      prefix={<TrophyOutlined />}
                    />
                  </Card>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">当前等级</h3>
                  <Progress 
                    percent={65} 
                    status="active" 
                    strokeColor="#3B82F6"
                    format={() => `等级 ${user.level}`}
                  />
                </div>
                
                <div className="flex space-x-4 mb-4">
                  <Button icon={<TeamOutlined />}>
                    {user.following} 关注
                  </Button>
                  <Button icon={<TeamOutlined />}>
                    {user.followers} 粉丝
                  </Button>
                  <Button icon={<SettingOutlined />}>
                    设置
                  </Button>
                  <Button icon={<LogoutOutlined />} danger>
                    退出
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>
      
      <Tabs defaultActiveKey="activities" items={tabItems} />
    </div>
  )
} 