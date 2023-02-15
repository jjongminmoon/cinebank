export interface TmdbProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetailProps {
  item: TmdbProps;
  adult: boolean;
  genres: [
    {
      id: number;
      name: string;
    },
  ];
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  production_countries: {
    name: string;
  };
  release_date: string;
  runtime: number;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ActorProps {
  id: number;
  cast: [
    {
      id: number;
      gender: number;
      name: string;
      profile_path: string;
      character: string;
      order: number;
    },
  ];
  crew: [
    {
      id: number;
      name: string;
      job: string;
    },
  ];
}

export interface GenreProps {
  genres: [
    {
      id: number;
      name: string;
    },
  ];
}
