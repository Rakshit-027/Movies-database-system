import React from 'react';
import { Star, Heart, HeartOff } from 'lucide-react';
import { Movie } from '../services/tmdb';
import { useWatchlist } from '../context/WatchlistContext';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlistClick = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/500x750?text=No+Image';
        }}
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-rating">
          <Star size={16} />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
        <button className="watchlist-btn" onClick={handleWatchlistClick}>
          {inWatchlist ? <HeartOff size={20} /> : <Heart size={20} />}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;