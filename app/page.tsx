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
                <h1>Server Session</h1>
            </div>
        </main>
    );
}