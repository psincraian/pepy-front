import AppBar from "@/app/components/app_bar";
import {LoginForm} from "@/app/components/login_form";

export default function Home() {
    return (
        <div>
            <header>
                <AppBar/>
            </header>
            <main>
                <h1>Login</h1>
                <LoginForm />
            </main>
        </div>
    );
}