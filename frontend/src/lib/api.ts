import { safeFetch } from "./Safefetch";
import z from "zod";

const SingleMovieSchema = z.object({
  id: z.string(),
  name: z.string(),
  genre: z.string(),
  description: z.string(),
});

export const searchSingleMovie = async (id: string) =>
  safeFetch({
    method: "GET",
    path: `/api/movies/${id}`,
    schema: SingleMovieSchema,
  });

export const searchMovieByGenre = async (genre: string) =>
  safeFetch({
    method: "GET",
    path: `/api/movies?genre=${genre}`,
    schema: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    ),
  });
