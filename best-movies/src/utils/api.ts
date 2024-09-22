export const fetchMovies = async () => {
  try {
    const response = await fetch("http://localhost:3000/movieInfo");

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
