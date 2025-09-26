
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrad';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';



export default function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);
    const handleSearch = async (query: string) => {
        if (!query) return;
        setMovies([]);
        setError(false);
        setLoading(true);
        try {
            const results = await fetchMovies(query);

            if (results.length === 0) {
                toast.error('No movies found fro your request.')
                return
            }
            setMovies(results);
        } catch {
            toast.error('Error fetching movies.')
            setError(true);
        }
        setLoading(false);
    }
    const handleSelect = (movie: Movie) => {
        console.log('Selected movie:', movie);
}

    return (
        <>
            <Toaster position="top-right" />
            <SearchBar onSubmit={handleSearch} />
            {loading && <Loader />}
            {error && !loading && <ErrorMessage />}
            {!loading && !error && <MovieGrid movies={movies} onSelect={handleSelect} />}
            
        </>
    )
}