import { Movie, Comments } from "../../../json-server/types";

export const fetchMovies = async () => {
  try {
    const response = await fetch("http://localhost:3000/movieInfo");

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Request Error", error);
    return [];
  }
};

export const fetchFilm = async (id: string | undefined) => {
  try {
    const response = await fetch("http://localhost:3000/movieInfo");

    if (!response.ok) {
      throw new Error("Failed to fetch film");
    }

    const data = await response.json();

    return data.find((film: Movie) => film.id === id) || null;
  } catch (error) {
    console.error("Request Error", error);
    return null;
  }
};

export const fetchComments = async (filmId: string | undefined) => {
  try {
    const response = await fetch(
      `http://localhost:3000/comments?filmId=${filmId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Request Error", error);
    return [];
  }
};

export const addComment = async (newComment: Comments) => {
  try {
    const response = await fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    if (!response.ok) {
      throw new Error("Failed to add comment");
    }

    return await response.json();
  } catch (error) {
    console.error("Request Error", error);
    return null;
  }
};

export const updateComment = async (
  commentId: string,
  updatedComment: Comments
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedComment),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update comment");
    }

    return await response.json();
  } catch (error) {
    console.error("Request Error", error);
    return null;
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete comment");
    }

    return true;
  } catch (error) {
    console.error("Request Error", error);
    return false;
  }
};
