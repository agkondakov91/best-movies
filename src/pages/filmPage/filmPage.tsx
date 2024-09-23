import styles from "./filmPage.module.scss";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import clsx from "clsx";

import { Button } from "../../components/button/button";
import { Header } from "../../components/header/header";
import { Description } from "../../components/description/description";
import { Line } from "../../components/line/line";
import { UserComments } from "../../components/comments/comments";
import { Popup } from "../../components/popup/popup";
import { Footer } from "../../components/footer/footer";

import { Movie, Comments } from "../../utils/types";
import {
  fetchFilm,
  fetchComments,
  addComment,
  updateComment,
  deleteComment,
} from "../../utils/api";

export const FilmPage = () => {
  //States
  const [filmData, setFilmData] = useState<Movie>();
  const [comments, setComments] = useState<Comments[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userComment, setUserComment] = useState("");
  const [editComment, setEditComment] = useState<string | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadFilmData = async () => {
      setLoading(true);
      const film = await fetchFilm(id);
      setFilmData(film);
      setLoading(false);
    };

    const loadComments = async () => {
      const comments = await fetchComments(id);
      setComments(comments);
    };

    loadFilmData();
    loadComments();
  }, [id]);

  if (loading) {
    return <Header title="Loading..." />;
  }

  //Navigation
  const goBack = () => {
    navigate("/");
  };

  //Popup function
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEditComment(null);
  };

  const handleAddComment = async () => {
    const newComment = {
      filmId: filmData?.id,
      userName,
      userComment,
      commentsTime: new Date().toLocaleString(),
    };

    const result = await addComment(newComment);

    if (result) {
      setUserName("");
      setUserComment("");
      setIsPopupOpen(false);
      setComments((prevComment) => [...prevComment, result]);
    }
  };

  //Comment function
  const handleEditComment = (commentId: string) => {
    const commentToEdit = comments.find((comment) => comment.id === commentId);

    if (commentToEdit) {
      setUserName(commentToEdit.userName);
      setUserComment(commentToEdit.userComment);
      setEditComment(commentId);
      setIsPopupOpen(true);
    }
  };

  const handleUpdateComment = async () => {
    if (editComment) {
      const update = {
        filmId: filmData?.id,
        userName,
        userComment,
        commentsTime: new Date().toLocaleString(),
      };

      const result = await updateComment(editComment, update);

      if (result) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === editComment ? result : comment
          )
        );

        setIsPopupOpen(false);
        setUserName("");
        setUserComment("");
        setEditComment(null);
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const isSuccess = await deleteComment(commentId);

    if (isSuccess) {
      setComments((prevComment) =>
        prevComment.filter((comment) => comment.id !== commentId)
      );
    }
  };

  return (
    <>
      <div className={clsx(styles.navigation, styles.root__navigation)}>
        <Button onClick={goBack}>
          <svg width="22" height="19" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10.281.296a1 1 0 0 1-.005 1.414L3.429 8.5H21a1 1 0 1 1 0 2H3.429l6.847 6.79a1 1 0 0 1-1.409 1.42l-8.571-8.5a1 1 0 0 1 0-1.42L8.867.29a1 1 0 0 1 1.414.006Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        <span className={styles.navigation__text}>Back to home</span>
      </div>
      <Header
        title={filmData!.name}
        subtitle={`${filmData?.year} | ${filmData?.certificate} | ${filmData?.time}`}
      />
      <main>
        <section>
          <figure className={styles.image}>
            <img
              src={`/api${filmData?.imageTitle}`}
              alt={filmData?.alt}
              className={styles.image__preview}
            />
          </figure>
          <Description title="About" info={filmData?.description} />
          <Line />
          <Description title="Genre" info={filmData?.genre} />
          <Line />
          <Description title="Director" info={filmData?.director} />
          <Line />
          <Description title="Likes" info={filmData?.likes} />
          <Line />
          <Description title="Rating" info={`${filmData?.rating} ⭐`} />
          <Line />
          <Description title="Watch Trailer" />
          {filmData!.trailer ? (
            <div className={styles.video}>
              <iframe
                width="560"
                height="315"
                src={filmData!.trailer}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p>No trailer available</p>
          )}
          <Description title="Comments" />
          <div
            className={clsx(styles.comments, {
              [styles.comments_add]: comments.length,
            })}
          >
            {comments.map((comment) => (
              <UserComments
                key={comment.id}
                id={comment.id}
                userName={comment.userName}
                userComment={comment.userComment}
                commentsTime={comment.commentsTime}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
              />
            ))}
          </div>
          <div className={styles.button}>
            <Button name="Add comments" onClick={handleOpenPopup} />
          </div>
        </section>
      </main>
      <Footer />
      <Popup
        userName={userName}
        userComment={userComment}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        addComment={editComment ? handleUpdateComment : handleAddComment}
        setName={setUserName}
        setComment={setUserComment}
      />
    </>
  );
};
