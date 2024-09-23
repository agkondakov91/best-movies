import styles from "./popup.module.scss";
import clsx from "clsx";

import { Button } from "../button/button";
import { Title } from "../title/title";

import { Dispatch, SetStateAction } from "react";

type PopupProps = {
  userName: string;
  userComment: string;
  isOpen: boolean;
  onClose: () => void;
  addComment: () => void;
  setName: Dispatch<SetStateAction<string>>;
  setComment: Dispatch<SetStateAction<string>>;
};

export const Popup = (props: PopupProps) => {
  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    props.setName(evt.target.value);
  };

  const handleCommentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setComment(evt.target.value);
  };

  return (
    <div className={clsx(styles.popup, { [styles.opened]: props.isOpen })}>
      <div className={styles.popup__content}>
        <div className={styles.popup__title}>
          <Title name="Leave a comment" />
          <Button onClick={props.onClose}>
            <svg width="20" height="20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M2.456.401a1.429 1.429 0 0 0-2.02 2.02l7.562 7.561-7.562 7.562a1.429 1.429 0 1 0 2.02 2.02l7.562-7.562 7.561 7.562a1.428 1.428 0 0 0 2.02-2.02l-7.561-7.562 7.561-7.561a1.428 1.428 0 0 0-2.02-2.02l-7.561 7.561L2.456.401Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
        <form className={styles.popup__form}>
          <input
            type="text"
            placeholder="Your Name"
            value={props.userName}
            onChange={handleNameChange}
          />
          <textarea
            name="comment"
            id="comment"
            placeholder="Your comment"
            rows={5}
            spellCheck="true"
            value={props.userComment}
            onChange={handleCommentChange}
          ></textarea>
        </form>
        <Button name="Add comment" onClick={props.addComment} />
      </div>
    </div>
  );
};
