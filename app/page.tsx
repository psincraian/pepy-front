import SearchBar from "@/app/components/search_bar";

export const runtime = 'edge';


export default async function Home() {

    return (
        <main
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
            }}
        >
            <div>
                <h1>pepy.tech</h1>
                <SearchBar/>
            </div>
        </main>
    );
}
