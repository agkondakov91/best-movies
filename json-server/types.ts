export interface Movie {
  id: string;
  time: string;
  name: string;
  rating: number;
  description: string;
  genre: string;
  director: string;
  certificate: string;
  country: string;
  year: number;
  likes: number;
  imageUrl: string;
  imageTitle: string;
  alt: string;
  trailer: string;
}

export type Comments = {
  id: string;
  userName: string;
  userComment: string;
  commentsTime: string;
};
