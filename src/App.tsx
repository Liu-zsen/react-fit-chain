import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { CheckIn } from './pages/CheckIn'
import { Profile } from './pages/Profile'
import { Leaderboard } from './pages/Leaderboard'
import { Knowledge } from './pages/Knowledge'
import { NotFound } from './pages/NotFound'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    document.title = 'FitChain - 健身打卡激励平台'
  }, [])

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
