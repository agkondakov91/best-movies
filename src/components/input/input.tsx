import styles from "./input.module.scss";

import { useState } from "react";

type InputProps = {
  onSearch: (value: string) => void;
};

export const Input = (props: InputProps) => {
  const [searchFilm, setSearchFilm] = useState("");

  const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilm(evt.target.value);
    props.onSearch(evt.target.value);
  };

  return (
    <input
      className={styles.search}
      type="search"
      id="search"
      placeholder="Movie Search"
      value={searchFilm}
      onChange={handleSearchChange}
    />
  );
};
