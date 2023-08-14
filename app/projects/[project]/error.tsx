'use client';

import {useEffect} from 'react'
import {redirect} from "next/navigation";

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div>
            <h2>Something went wrong!</h2>
            <p>There was an internal server error, please report it to <a href="https://twitter.com/psincraian">@psincraian</a> at Twitter/X</p>
            <p>Status details:</p>
            <ul>
               <li>Server message: {error.message}</li>
            </ul>
            <button
                onClick={
                    () => redirect('/')
                }
            >
                Back home
            </button>
        </div>
    )
}