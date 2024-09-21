import styles from "./header.module.scss";

type HeaderProps = {
  title: string;
  subtitle: string;
};

export const Header = (props: HeaderProps) => {
  return (
    <header className={styles.root__header}>
      <h1 className={styles.header}>{props.title}</h1>
      <p className={styles.header__subtitle}>{props.subtitle}</p>
    </header>
  );
};
