import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import './App.css'
import authService from './appwrite/auth.js';
import { login, logout } from './store/authSlice';
import { Header, Footer, ThemeController, Loading } from './components/index.js';
import { Outlet } from 'react-router';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])
  return !loading ? (
    <>
      <ThemeController />
      <div className="
                min-h-screen flex flex-col
                bg-[#e5e7eb] text-[#1e293b]
                dark:bg-[#07111F] dark:text-[#e2e8f0]
                transition-colors duration-300
              ">

        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />

      </div>
    </>
  )
    : (<Loading />)
}

export default App
