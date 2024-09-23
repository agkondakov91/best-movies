import styles from "./filter.module.scss";

import { Button } from "../button/button";

type FilterProps = {
  filterReset: () => void;
  filterCountry: () => void;
  filterRating: () => void;
};

export const Filter = (props: FilterProps) => {
  return (
    <div className={styles.menu}>
      <p className={styles.menu__title}>Filter:</p>
      <ul className={styles.menu__list}>
        <li>
          <Button name="Reset" onClick={props.filterReset} />
        </li>
        <li>
          <Button name="Country" onClick={props.filterCountry} />
        </li>
        <li>
          <Button name="Rating" onClick={props.filterRating} />
        </li>
      </ul>
    </div>
  );
};
