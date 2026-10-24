import Image from "next/image";
import Link from "next/link";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <p className={styles.kicker}>Gravadora &amp; Escola de Música</p>
        <h1 className={styles.title}>Orion Music</h1>
        <p className={styles.lead}>
          Onde o som nasce, é gravado e aprendido.
        </p>
        <div className={styles.actions}>
          <Link href="/lancamentos" className={styles.primary}>
            Ouvir lançamentos
          </Link>
          <span className={styles.soon}>Escola, em breve</span>
        </div>
      </div>
      <Image
        src="/logo.png"
        alt="Logo da Orion Music"
        width={411}
        height={480}
        priority
        className={styles.logo}
      />
    </section>
  );
}
