import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import MyPlaylistsPage from './pages/MyPlaylistsPage'
import { Route, Routes } from 'react-router'

function App() {

 return (
  <div className="flex min-h-[100dvh] w-full justify-center bg-linear-to-r from-violet-200 to-red-100">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/my-playlists" element={<MyPlaylistsPage />} />
    </Routes>
  </div>
 )
}

export default App
