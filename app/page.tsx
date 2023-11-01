import SearchBar from "@/app/components/search_bar";
import AppBar from "@/app/components/app_bar";
import styles from "./page.module.css";


export const runtime = "edge";

export default async function Home() {
  return (
    <>
      <header className={styles.header}>
        <AppBar withSearch={false} />
      </header>
      <main className={styles.main}>
        <div>
          <h1>pepy.tech</h1>
          <SearchBar />
        </div>
      </main>
    </>
  );
}
