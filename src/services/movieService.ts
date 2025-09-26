import type { Movie } from "../types/movies";
import axios from "axios";

const API_URL = 'https://api.themoviedb.org/3/search/movie';

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const token = import.meta.env.VITE_TMDB_TOKEN;

    const response = await axios.get(API_URL, {
        params: {
            query,
            include_adult: false,
            language: 'en-US',
            page: 1,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data.results
}