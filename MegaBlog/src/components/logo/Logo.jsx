import React from 'react'
import { useSelector } from 'react-redux'

function Logo({ className = "" }) {
    const mode = useSelector((state) => state.theme.mode)
    return (
            <img
                src={mode === "light" ? "/Logo_L.svg" : "/logo_d.svg"}
                alt="BlogSpace"
                className={`block  object-contain ${className}`}
            />

    )
}

export default Logo