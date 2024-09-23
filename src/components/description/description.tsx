import styles from "./description.module.scss";

type DescriptionProps = {
  title: string;
  info?: string | number;
};

export const Description = (props: DescriptionProps) => {
  return (
    <dl className={styles.description}>
      <dt className={styles.description__title}>{props.title}</dt>
      <dd className={styles.description__info}>{props.info}</dd>
    </dl>
  );
};
