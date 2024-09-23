import styles from "./comments.module.scss";
import { Comments } from "../../utils/types";

type CommentsProps = Comments & {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export const UserComments = (props: CommentsProps) => {
  return (
    <article className={styles.comment}>
      <div className={styles.edit}>
        <p className={styles.name}>{props.userName}</p>
        <ul className={styles.buttons}>
          <li>
            <svg
              width="14"
              height="14"
              fill="#F5C518"
              onClick={() => props.onEdit(props.id!)}
            >
              <path
                fillRule="evenodd"
                d="M0 11.084V14h2.916l8.601-8.601-2.916-2.916L0 11.083Zm13.773-7.94a.774.774 0 0 0 0-1.097l-1.82-1.82a.774.774 0 0 0-1.097 0L9.433 1.651l2.916 2.916 1.424-1.423Z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          <li>
            <svg
              width="15"
              height="15"
              fill="#F5C518"
              onClick={() => props.onDelete(props.id!)}
            >
              <path
                fillRule="evenodd"
                d="M2.707.293a1 1 0 0 0-1.414 1.414L6.586 7l-5.293 5.293a1 1 0 1 0 1.414 1.414L8 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L9.414 7l5.293-5.293A1 1 0 0 0 13.293.293L8 5.586 2.707.293Z"
                clipRule="evenodd"
              />
            </svg>
          </li>
        </ul>
      </div>
      <p className={styles.text}>{props.userComment}</p>
      <p className={styles.time}>{props.commentsTime}</p>
    </article>
  );
};
