import AppBar from "@/app/components/app_bar";

export const runtime = 'edge';


export default async function Page() {

    return (
        <>
            <AppBar/>
            <main
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "70vh",
                }}>
                <div>
                    <h1>Newsletter</h1>
                    <p>Soon it will be back :)</p>
                </div>
            </main>
        </>
    );
}
