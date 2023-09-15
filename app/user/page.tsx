'use client'

import AppBar from "@/app/components/app_bar";
import {Button} from "@mui/material";
import {useRouter} from "next/navigation";
import {getCurrentUser, signout, User} from "@/app/user/helper/auth";
import {useEffect, useState} from "react";
import {PEPY_HOST} from "@/app/constants";
import {ApiKey} from "@/app/user/model";
import ApiKeyTable from "@/app/user/components/api_keys_table";


async function getApiKeys(user: User) {
    console.log("Start fetching api keys")
    const response = await fetch(PEPY_HOST + '/api/v3/user/api-keys', {
        method: 'GET',
        headers: {
            authorization: 'Bearer ' + user.accessToken,
        }
    });
    const body = await response.json();
    console.log("Api keys fetched", body)
    return body.map((key: any) => key as ApiKey);
}

export default function Home() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<null | User>(null);

    useEffect(() => {
        getCurrentUser().then(u => {setCurrentUser(u); console.log(u)}).catch(err => console.error(err));
    }, []);

    function signoutUser() {
        signout();
        setCurrentUser(null);
    }

    return (
        <div>
            <header>
                <AppBar/>
            </header>
            <main>
                <h1>Hello {currentUser !== null ? currentUser.username : "pythonista"}</h1>
                {currentUser === null ?
                    <>
                        <Button sx={{m: '8px'}} variant="contained" onClick={e => router.push("/user/login")}>Login</Button>
                        <Button variant="contained" onClick={e => router.push("/user/signup")}>Signup</Button>
                    </> :
                    <>
                        <ApiKeyTable />
                        <Button sx={{m: '8px'}} variant="contained" onClick={e => signoutUser()}>Sign out</Button>
                    </>
                }
            </main>
        </div>
    );
}