import React, { useState } from 'react'
import { Tabs, Table, Button, Avatar, Tag, Badge } from 'antd'
import type { TabsProps } from 'antd'
import { TrophyOutlined, FireOutlined, CalendarOutlined, WalletOutlined } from '@ant-design/icons'

interface UserRank {
  id: string
  rank: number
  name: string
  avatar: string
  score: number
  streak: number
  tokenBalance: number
  level: number
  badges: string[]
  isFollowing?: boolean
}

export const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<UserRank[]>([
    {
      id: '1',
      rank: 1,
      name: '健身达人小王',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      score: 8750,
      streak: 86,
      tokenBalance: 12580,
      level: 15,
      badges: ['连续打卡30天', '知识分享达人', '邀请之星'],
      isFollowing: true
    },
    {
      id: '2',
      rank: 2,
      name: '马甲线女神',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      score: 8430,
      streak: 75,
      tokenBalance: 10240,
      level: 14,
      badges: ['连续打卡30天', '社区活跃者'],
      isFollowing: false
    },
    {
      id: '3',
      rank: 3,
      name: '肌肉型男阿龙',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      score: 7980,
      streak: 65,
      tokenBalance: 9650,
      level: 13,
      badges: ['健身知识库', '评论达人'],
      isFollowing: true
    },
    {
      id: '4',
      rank: 4,
      name: '瑜伽女神Linda',
      avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
      score: 7650,
      streak: 62,
      tokenBalance: 8920,
      level: 12,
      badges: ['连续打卡30天'],
      isFollowing: false
    },
    {
      id: '5',
      rank: 5,
      name: '力量训练大师',
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
      score: 7320,
      streak: 58,
      tokenBalance: 8540,
      level: 12,
      badges: ['举重达人', '知识分享者'],
      isFollowing: false
    },
  ])

  const handleFollow = (userId: string) => {
    setLeaderboardData(prevData => 
      prevData.map(user => 
        user.id === userId 
          ? { ...user, isFollowing: !user.isFollowing } 
          : user
      )
    )
  }

  const columns = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      render: (rank: number) => {
        const style = { fontSize: '18px', fontWeight: 'bold' }
        if (rank === 1) return <div style={{ ...style, color: '#FFD700' }}>{rank}</div>
        if (rank === 2) return <div style={{ ...style, color: '#C0C0C0' }}>{rank}</div>
        if (rank === 3) return <div style={{ ...style, color: '#CD7F32' }}>{rank}</div>
        return <div style={style}>{rank}</div>
      }
    },
    {
      title: '用户',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: UserRank) => (
        <div className="flex items-center space-x-3">
          <Avatar src={record.avatar} size={40} />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-xs text-gray-500">等级 {record.level}</div>
          </div>
        </div>
      )
    },
    {
      title: <span><TrophyOutlined /> 综合得分</span>,
      dataIndex: 'score',
      key: 'score',
      sorter: (a: UserRank, b: UserRank) => a.score - b.score,
      render: (score: number) => <span className="font-semibold text-blue-600">{score}</span>
    },
    {
      title: <span><FireOutlined /> 连续打卡</span>,
      dataIndex: 'streak',
      key: 'streak',
      sorter: (a: UserRank, b: UserRank) => a.streak - b.streak,
      render: (streak: number) => <span className="font-semibold">{streak}天</span>
    },
    {
      title: <span><WalletOutlined /> FIT余额</span>,
      dataIndex: 'tokenBalance',
      key: 'tokenBalance',
      sorter: (a: UserRank, b: UserRank) => a.tokenBalance - b.tokenBalance,
      render: (balance: number) => <span className="font-semibold text-green-600">{balance} FIT</span>
    },
    {
      title: '成就徽章',
      dataIndex: 'badges',
      key: 'badges',
      render: (badges: string[]) => (
        <div className="flex flex-wrap gap-1">
          {badges.map(badge => (
            <Tag color="blue" key={badge}>
              {badge}
            </Tag>
          ))}
        </div>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: UserRank) => (
        <Button
          type={record.isFollowing ? 'default' : 'primary'}
          size="small"
          onClick={() => handleFollow(record.id)}
          className={record.isFollowing ? '' : 'bg-primary'}
        >
          {record.isFollowing ? '已关注' : '关注'}
        </Button>
      )
    },
  ]

  const tabItems: TabsProps['items'] = [
    {
      key: 'global',
      label: '全球排行',
      children: <Table 
        dataSource={leaderboardData} 
        columns={columns} 
        rowKey="id"
        pagination={false}
      />,
    },
    {
      key: 'monthly',
      label: '月度排行',
      children: <Table 
        dataSource={leaderboardData.slice().sort((a, b) => b.streak - a.streak)} 
        columns={columns} 
        rowKey="id"
        pagination={false}
      />,
    },
    {
      key: 'contribution',
      label: '贡献榜',
      children: <Table 
        dataSource={leaderboardData.slice().sort((a, b) => b.tokenBalance - a.tokenBalance)} 
        columns={columns} 
        rowKey="id"
        pagination={false}
      />,
    },
    {
      key: 'friends',
      label: '好友榜',
      children: <Table 
        dataSource={leaderboardData.filter(user => user.isFollowing)} 
        columns={columns} 
        rowKey="id"
        pagination={false}
      />,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">排行榜</h1>
        <div className="space-x-2">
          <span className="text-gray-500">
            <CalendarOutlined /> 更新时间: 2025-05-10
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-xl mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-gray-500 mb-1">我的排名</div>
            <div className="text-2xl font-bold text-primary">42</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-gray-500 mb-1">我的得分</div>
            <div className="text-2xl font-bold text-primary">4,350</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-gray-500 mb-1">连续打卡</div>
            <div className="text-2xl font-bold text-primary">18天</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-gray-500 mb-1">FIT余额</div>
            <div className="text-2xl font-bold text-green-600">2,450</div>
          </div>
        </div>
      </div>
      
      <Tabs defaultActiveKey="global" items={tabItems} />
    </div>
  )
} 