import { useEffect, useState } from 'react';
import { MovieCard } from '../components/MovieCard';

import { api } from '../services/api';

import '../styles/content.scss';

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name?: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title?: string;
}

export function Content(props: GenreResponseProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.id}`).then((response) => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${props.id}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [props.id]);

  return (
    <div className='container'>
      <header>
        <span className='category'>
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className='movies-list'>
          {movies.map((movie) => (
            <MovieCard
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
