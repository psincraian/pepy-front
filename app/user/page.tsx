"use client";

import AppBar from "@/app/components/app_bar";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { getCurrentUser, signout, User } from "@/app/user/helper/auth";
import { useEffect, useState } from "react";
import ApiKeyTable from "@/app/user/components/api_keys_table";

export default function Home() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<null | User>(null);

  useEffect(() => {
    getCurrentUser()
      .then((u) => {
        setCurrentUser(u);
        console.log(u);
      })
      .catch((err) => console.error(err));
  }, []);

  function signoutUser() {
    signout();
    setCurrentUser(null);
  }

  return (
    <div>
      <header>
        <AppBar />
      </header>
      <main>
        <h1>
          Hello {currentUser !== null ? currentUser.username : "pythonista"}
        </h1>
        {currentUser === null ? (
          <>
            <Button
              sx={{ m: "8px" }}
              variant="contained"
              onClick={(e) => router.push("/user/login")}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={(e) => router.push("/user/signup")}
            >
              Signup
            </Button>
          </>
        ) : (
          <>
            <ApiKeyTable />
            <Button
              sx={{ m: "8px" }}
              variant="contained"
              onClick={(e) => signoutUser()}
            >
              Sign out
            </Button>
          </>
        )}
      </main>
    </div>
  );
}
