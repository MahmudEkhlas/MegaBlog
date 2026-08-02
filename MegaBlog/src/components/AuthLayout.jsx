import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export default function Protected(
    {
        children,
        authentication = true
    }
) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth.status);
    useEffect(() => {
        //TODO : try to make teh logic little bit easier
        if (authentication && authStatus !== authentication) {
            navigate("/login");
        } else if (!authentication && authStatus !== authentication) {
            navigate("/");
        }

        setLoader(false);

    }, [authStatus, navigate, authentication])
    return (
        <div>AuthLayout</div>
    )
}
