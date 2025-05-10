import { Button, Card, Statistic, Row, Col } from 'antd'

export const Home = () => {
  return (
    <div className="space-y-8">
      <section className="text-center py-12 px-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h1 className="text-4xl font-bold mb-4">欢迎来到 FitChain 健身激励平台</h1>
        <p className="text-xl mb-8">通过健身打卡，赚取代币，提升自我</p>
        <Button size="large" type="primary" className="bg-secondary border-none hover:bg-green-600">
          立即开始打卡
        </Button>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">数据概览</h2>
        <Row gutter={16}>
          <Col xs={12} md={6}>
            <Card>
              <Statistic
                title="今日打卡人数"
                value={1243}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <Statistic
                title="连续打卡之星"
                value={82}
                suffix="天"
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <Statistic
                title="本月奖励池"
                value={9876}
                suffix="FIT"
                valueStyle={{ color: '#1677ff' }}
              />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <Statistic
                title="平台注册用户"
                value={12598}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">平台亮点</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-2">健身打卡奖励</h3>
            <p className="text-gray-600">每日打卡赚取FIT代币，连续打卡获得额外奖励，激励你坚持锻炼。</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold mb-2">知识分享社区</h3>
            <p className="text-gray-600">分享你的健身经验和知识，获得社区认可和额外代币奖励。</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold mb-2">去中心化治理</h3>
            <p className="text-gray-600">持有FIT代币，参与平台决策投票，共同决定平台未来发展方向。</p>
          </div>
        </div>
      </section>
    </div>
  )
} 