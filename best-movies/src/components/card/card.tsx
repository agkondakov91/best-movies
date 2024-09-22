import styles from "./card.module.scss";
import { Movie } from "../../../../json-server/types";

import { Link } from "react-router-dom";

type CardProps = Pick<
  Movie,
  "id" | "name" | "country" | "year" | "imageUrl" | "rating" | "alt"
>;

export const Card = (props: CardProps) => {
  return (
    <>
      <li className={styles.card}>
        <Link to={`/film/${props.id}`} className={styles.card__link}>
          <figure>
            <img
              className={styles.card__img}
              src={props.imageUrl}
              alt={props.alt}
              width="304"
              height="396"
            />
            <div className={styles.card__range}>{props.rating}</div>
            <figcaption>
              <p className={styles.card__title}>{props.name}</p>
              <p
                className={styles.card__subtitle}
              >{`${props.year} / ${props.country}`}</p>
            </figcaption>
          </figure>
        </Link>
      </li>
    </>
  );
};
