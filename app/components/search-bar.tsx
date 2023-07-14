"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'

interface SearchComponentProps {
    handleSearch: (value: string) => void;
}

export default function SearchComponent() {
    const [search, setSearch] = useState("");
    const router = useRouter()

    const handleSearch = (value: string) => {
        router.push("/projects/" + value)
    }

    return (
        <div className="flex items-center">
            <div className="flex border border-purple-200 rounded">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="px-4 text-white bg-purple-600 border-l rounded" onClick={() => handleSearch(search)}>
                    Search
                </button>
            </div>
        </div>
    );
}





