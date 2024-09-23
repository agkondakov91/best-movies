import styles from "./button.module.scss";

type ButtonProps = {
  name?: string;
  children?: React.ReactNode;
  onClick: () => void;
};

export const Button = (props: ButtonProps) => {
  return (
    <button type="button" className={styles.button} onClick={props.onClick}>
      {props.name || props.children}
    </button>
  );
};
