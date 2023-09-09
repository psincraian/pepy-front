'use client'

import AppBar from "@/app/components/app_bar";
import {LoginForm} from "@/app/components/login";
import {Button} from "@mui/material";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <div>
            <header>
                <AppBar/>
            </header>
            <main>
                <h1>Hello {localStorage.getItem("CognitoIdentityServiceProvider.67oda21n4538a52ub88r0tav24.LastAuthUser")}</h1>
                <Button variant="contained" onClick={e => router.push("/user/login")}>Login</Button>
                <Button variant="contained" onClick={e => console.log("TBD")}>Signup</Button>
            </main>
        </div>
    );
}