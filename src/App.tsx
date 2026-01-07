import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'

const LoginApp = lazy(() => import('login/LoginApp'))
const ProfileApp = lazy(() => import('profile/ProfileApp'))

function App() {
    const storeUser = useSelector((s: any) => s)
  console.log('LoginApp render, storeUser:', storeUser)
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<LoginApp />} />
          <Route path="/profile" element={<ProfileApp />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
