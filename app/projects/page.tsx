import Link from "next/link";
import SearchComponent from "@/app/components/search-bar";
export const runtime = 'edge';

export default function Page() {
    return (
        <>
            <h1 className="title">
                Search projects
            </h1>
            <SearchComponent />
        </>
    )
}