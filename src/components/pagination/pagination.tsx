import styles from "./pagination.module.scss";

import { Button } from "../button/button";

type PaginationProps = {
  currentPage: string;
  onNext: () => void;
  onPrev: () => void;
};

export const Pagination = (props: PaginationProps) => {
  return (
    <div className={styles.control}>
      <Button onClick={props.onPrev}>
        <svg width="22" height="19" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10.281.296a1 1 0 0 1-.005 1.414L3.429 8.5H21a1 1 0 1 1 0 2H3.429l6.847 6.79a1 1 0 0 1-1.409 1.42l-8.571-8.5a1 1 0 0 1 0-1.42L8.867.29a1 1 0 0 1 1.414.006Z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
      <p className={styles.control__page}>{props.currentPage}</p>
      <Button onClick={props.onNext}>
        <svg width="22" height="19" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M11.719 18.704a1 1 0 0 1 .005-1.414l6.847-6.79H1a1 1 0 1 1 0-2h17.571l-6.847-6.79A1 1 0 0 1 13.133.29l8.571 8.5a1 1 0 0 1 0 1.42l-8.571 8.5a1 1 0 0 1-1.414-.006Z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </div>
  );
};
