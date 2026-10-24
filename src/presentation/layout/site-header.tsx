import Image from "next/image";
import Link from "next/link";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        <Image src="/logo.png" alt="" width={40} height={46} priority />
        <span>Orion Music</span>
      </Link>
      <nav>
        <Link href="/lancamentos">Lançamentos</Link>
      </nav>
    </header>
  );
}
