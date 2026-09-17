import React from 'react'

function Loading() {
    return (
        <>
            <div className="flex space-x-2">
                <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce"></div>
                <div
                    className="h-3 w-3 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                    className="h-3 w-3 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                ></div>
            </div>
        </>
    )
}

export default Loading