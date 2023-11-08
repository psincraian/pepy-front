import AppBar from "@/app/components/app_bar";
import { LoginForm } from "@/app/user/login/components/login_form";

export default function Home() {
  return (
    <div>
      <header>
        <AppBar />
      </header>
      <main>
        <LoginForm />
      </main>
    </div>
  );
}
