import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function Logoutbtn({ onLogout }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        //Almost all the service of the Appwrite return promises
        authService.logout().then(() => {
            dispatch(logout())
            navigate("/")
            onLogout?.();
        })
    }
    return (
        <button
            className="
                ml-2 rounded-full px-5 py-2
                bg-gray-900 text-white
                transition-all duration-200
                hover:bg-gray-800
                dark:bg-linear-to-r
                dark:from-cyan-400
                dark:to-blue-500
                dark:text-[#07111F]
                dark:shadow-[0_0_20px_rgba(59,130,246,0.25)]
                dark:hover:shadow-[0_0_28px_rgba(34,211,238,0.4)]
                dark:hover:scale-105"
            onClick={logoutHandler}
        >Logout</button>
    )
}

export default Logoutbtn