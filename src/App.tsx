import React, { useState, useEffect } from 'react';
import { Film } from 'lucide-react';
import { Movie, searchMovies, getPopularMovies } from './services/tmdb';
import { WatchlistProvider } from './context/WatchlistContext';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import './styles/global.css';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!import.meta.env.VITE_TMDB_API_KEY) {
      setError('TMDB API key is not configured. Please add your API key to the .env file.');
      setLoading(false);
      return;
    }
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setError(null);
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      loadPopularMovies();
      return;
    }

    setLoading(true);
    try {
      const results = await searchMovies(query);
      setMovies(results);
      setError(null);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WatchlistProvider>
      <div>
        <header className="header">
          <div className="header-content container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Film size={24} />
              <h1>Movie Database</h1>
            </div>
            <nav className="nav-links">
              <a href="#movies"></a>
              <a href="#watchlist"></a>
            </nav>
          </div>
        </header>

        <main className="container">
          <SearchBar onSearch={handleSearch} />

          {loading && <div className="loading">Loading...</div>}
          {error && <div className="error">{error}</div>}
          
          <div className="movie-grid">
            {movies && movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
            {!loading && !error && movies.length === 0 && (
              <div className="no-results">No movies found</div>
            )}
          </div>
        </main>
      </div>
    </WatchlistProvider>
  );
}

export default App;