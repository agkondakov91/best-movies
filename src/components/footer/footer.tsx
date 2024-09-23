import styles from "./footer.module.scss";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__description}>
        <p>2024 Best Movies</p>
        <p>React + Vite project for practice</p>
      </div>
      <Link to="https://github.com/agkondakov91" target="blank">
        <div className={styles.footer__link}></div>
      </Link>
    </footer>
  );
};
