import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
//the below import syntax is basically we are using an alias just in order we want to change the name of the function that we rae importing
import { login as storeLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(storeLogin(userData));
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div
            className="
                flex items-center justify-center
                w-full
                py-12
                transition-colors duration-300"
        >
            <div className="
                    mx-auto w-full max-w-lg
                    rounded-2xl
                    px-10 py-8
                    bg-white
                    border border-gray-200
                    shadow-lg
                    dark:bg-[#0f172a]
                    dark:border-white/10
                    dark:shadow-[0_0_35px_rgba(34,211,238,0.08)]
                    transition-all duration-300
            ">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-25">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                    Sign in to your account
                </h2>

                <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-400">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="
                            font-medium
                            text-blue-600
                            hover:text-blue-500
                            dark:text-cyan-400
                            dark:hover:text-cyan-300
                            transition-all duration-200
                            hover:underline
                        ">
                        Sign Up
                    </Link>
                </p>


                {error && (
                    <div className=" mt-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-400">
                        {error}
                    </div>
                )}




                <form onSubmit={handleSubmit(login)} noValidate className='mt-8'>
                    <div className='space-y-4'>
                        <div>
                            <Input
                                label="Email: "
                                placeholder="Enter your Email"
                                type='email'
                                className="
                                        py-2.5
                                        bg-gray-50
                                        border-gray-300
                                        text-gray-900
                                        placeholder:text-gray-400
                                        focus:border-blue-500
                                        focus:ring-2
                                        focus:ring-blue-500/20
                                        dark:bg-[#111c30]
                                        dark:border-white/10
                                        dark:text-gray-100
                                        dark:placeholder:text-gray-500
                                        dark:focus:border-cyan-400
                                        dark:focus:ring-cyan-400/20
                                        dark:focus:bg-[#111c30]
                                        caret-gray-900
                                        dark:caret-gray-100
                                        [&:-webkit-autofill]:bg-gray-50
                                        [&:-webkit-autofill]:[-webkit-text-fill-color:#111827]
                                        [&:-webkit-autofill]:[box-shadow:inset_0_0_0_1000px_#f9fafb]
                                        dark:[&:-webkit-autofill]:bg-[#111c30]
                                        dark:[&:-webkit-autofill]:[-webkit-text-fill-color:#f3f4f6]
                                        dark:[&:-webkit-autofill]:[box-shadow:inset_0_0_0_1000px_#111c30]
                                    "
                                {...register("email", {
                                    required: "Email is required",
                                    validate: {
                                        matchPattern: (value) => {
                                            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                            return regex.test(value) || "Please enter a valid email";
                                        }
                                    }
                                })}
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <Input
                                label="Password: "
                                placeholder="Enter your Password"
                                type={showPassword ? "text" : "password"}
                                className="
                                            py-2.5
                                            pr-12
                                            bg-gray-50
                                            border-gray-300
                                            text-gray-900
                                            placeholder:text-gray-400
                                            focus:border-blue-500
                                            focus:ring-2
                                            focus:ring-blue-500/20
                                            dark:bg-[#111c30]
                                            dark:border-white/10
                                            dark:text-gray-100
                                            dark:placeholder:text-gray-500
                                            dark:focus:border-cyan-400
                                            dark:focus:ring-cyan-400/20
                                            dark:focus:bg-[#111c30]
                                            caret-gray-900
                                            dark:caret-gray-100
                                            [&:-webkit-autofill]:bg-gray-50
                                            [&:-webkit-autofill]:[-webkit-text-fill-color:#111827]
                                            [&:-webkit-autofill]:[box-shadow:inset_0_0_0_1000px_#f9fafb]
                                            dark:[&:-webkit-autofill]:bg-[#111c30]
                                            dark:[&:-webkit-autofill]:[-webkit-text-fill-color:#f3f4f6]
                                            dark:[&:-webkit-autofill]:[box-shadow:inset_0_0_0_1000px_#111c30]"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters"
                                    }
                                })}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="
                                        absolute right-3 top-[3.2rem] -translate-y-1/2
                                        text-gray-500 hover:text-gray-700
                                        dark:text-gray-400 dark:hover:text-cyan-400
                                        transition-colors duration-200
                                    "
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.8}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.29 5 12 5c4.71 0 8.577 2.51 9.964 6.678.041.13.041.266 0 .396C20.577 16.49 16.71 19 12 19c-4.71 0-8.577-2.51-9.964-6.678z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.8}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.08 7.207 19 12 19c1.62 0 3.16-.363 4.526-1.009M6.228 6.228A10.45 10.45 0 0112 5c4.793 0 8.773 2.92 10.065 7a10.45 10.45 0 01-1.625 2.982M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243"
                                        />
                                    </svg>
                                )}
                            </button>

                            {errors.password && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type='submit'
                            className="
                                w-full
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                font-semibold
                                rounded-xl
                                mt-8
                                py-3
                                transition-all duration-200
                                dark:bg-linear-to-r
                                dark:from-cyan-400
                                dark:to-blue-500
                                dark:text-[#07111F]
                                dark:hover:from-cyan-300
                                dark:hover:to-blue-400
                                dark:shadow-[0_0_20px_rgba(34,211,238,0.18)]
                                dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]
                                dark:hover:scale-[1.01]
                            "
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login