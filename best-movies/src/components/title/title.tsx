import styles from "./title.module.scss";

type TitleProps = {
  name: string;
};

export const Title = (props: TitleProps) => {
  return <h2 className={styles.title}>{props.name}</h2>;
};
