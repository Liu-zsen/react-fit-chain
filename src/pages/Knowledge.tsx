import React, { useState } from 'react'
import { 
  Card, 
  List, 
  Button, 
  Tabs, 
  Rate, 
  Avatar, 
  Space, 
  Tag,
  Modal,
  Form,
  Input,
  Upload,
  message
} from 'antd'
import { 
  LikeOutlined, 
  MessageOutlined, 
  StarOutlined, 
  PlusOutlined, 
  UploadOutlined
} from '@ant-design/icons'
import type { UploadFile } from 'antd/es/upload/interface'
import type { TabsProps } from 'antd'

const { TextArea } = Input

interface KnowledgeItem {
  id: string
  title: string
  summary: string
  content: string
  author: {
    name: string
    avatar: string
  }
  likes: number
  comments: number
  rating: number
  tags: string[]
  createdAt: string
}

export const Knowledge = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [form] = Form.useForm()

  // 模拟知识分享数据
  const knowledgeList: KnowledgeItem[] = [
    {
      id: '1',
      title: '新手健身指南：从零开始的完整计划',
      summary: '适合健身小白的入门计划，包含详细动作讲解和周计划安排。',
      content: '这是文章的完整内容...',
      author: {
        name: '健身教练张',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      likes: 245,
      comments: 42,
      rating: 4.8,
      tags: ['新手指南', '健身计划', '动作讲解'],
      createdAt: '2025-05-01'
    },
    {
      id: '2',
      title: '增肌饮食：如何科学摄入蛋白质',
      summary: '详解每日蛋白质需求量，以及如何通过日常饮食达到健身增肌目标。',
      content: '这是文章的完整内容...',
      author: {
        name: '营养师李',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
      },
      likes: 178,
      comments: 36,
      rating: 4.5,
      tags: ['增肌', '饮食', '蛋白质'],
      createdAt: '2025-04-28'
    },
    {
      id: '3',
      title: '家庭徒手训练：无器械全身锻炼',
      summary: '10个高效的徒手动作，在家就能练出好身材，适合无法前往健身房的朋友。',
      content: '这是文章的完整内容...',
      author: {
        name: '健身达人王',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
      },
      likes: 320,
      comments: 65,
      rating: 4.9,
      tags: ['徒手训练', '家庭健身', '无器械'],
      createdAt: '2025-04-25'
    },
  ]

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCancelModal = () => {
    setIsModalOpen(false)
    form.resetFields()
    setFileList([])
  }

  const handleSubmitArticle = () => {
    form.validateFields()
      .then(values => {
        console.log('发布文章:', values)
        message.success('文章提交成功！审核通过后将获得20 FIT奖励')
        handleCancelModal()
      })
      .catch(info => {
        console.log('表单验证失败:', info)
      })
  }

  const tabItems: TabsProps['items'] = [
    {
      key: 'newest',
      label: '最新发布',
      children: <ArticleList data={knowledgeList} />,
    },
    {
      key: 'popular',
      label: '热门推荐',
      children: <ArticleList data={[...knowledgeList].sort((a, b) => b.likes - a.likes)} />,
    },
    {
      key: 'following',
      label: '关注作者',
      children: <ArticleList data={knowledgeList.slice(0, 1)} />,
    },
  ]
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">知识分享</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleOpenModal}
          className="bg-primary"
        >
          发布文章
        </Button>
      </div>
      
      <Tabs defaultActiveKey="newest" items={tabItems} />
      
      <Modal
        title="发布健身知识文章"
        open={isModalOpen}
        onCancel={handleCancelModal}
        footer={[
          <Button key="cancel" onClick={handleCancelModal}>
            取消
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleSubmitArticle}
            className="bg-primary"
          >
            发布文章
          </Button>,
        ]}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
        >
          <Form.Item
            name="title"
            label="文章标题"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="输入一个吸引人的标题" />
          </Form.Item>
          
          <Form.Item
            name="summary"
            label="文章摘要"
            rules={[{ required: true, message: '请输入文章摘要' }]}
          >
            <Input placeholder="简短介绍文章的主要内容" />
          </Form.Item>
          
          <Form.Item
            name="content"
            label="文章内容"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <TextArea rows={6} placeholder="详细的文章内容..." />
          </Form.Item>
          
          <Form.Item
            name="tags"
            label="标签"
            rules={[{ required: true, message: '请至少添加一个标签' }]}
          >
            <Input placeholder="标签之间用逗号分隔，如：增肌,饮食,训练计划" />
          </Form.Item>
          
          <Form.Item
            name="cover"
            label="封面图片"
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              maxCount={1}
            >
              {fileList.length === 0 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>上传图片</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

interface ArticleListProps {
  data: KnowledgeItem[]
}

const ArticleList = ({ data }: ArticleListProps) => {
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  )

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{ pageSize: 5 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText icon={StarOutlined} text={item.rating.toString()} key="list-star" />,
            <IconText icon={LikeOutlined} text={item.likes.toString()} key="list-like" />,
            <IconText icon={MessageOutlined} text={item.comments.toString()} key="list-comment" />,
          ]}
          extra={
            <div className="flex flex-col items-end space-y-2">
              <span className="text-gray-500 text-sm">{item.createdAt}</span>
              <Rate disabled defaultValue={item.rating} allowHalf />
            </div>
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.author.avatar} />}
            title={<a href={`/knowledge/${item.id}`}>{item.title}</a>}
            description={item.author.name}
          />
          <div className="mt-2">
            <p>{item.summary}</p>
            <div className="mt-3">
              {item.tags.map(tag => (
                <Tag color="blue" key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </List.Item>
      )}
    />
  )
} 