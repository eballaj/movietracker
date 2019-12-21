export interface Movie {
  id?: number;
  title?: string;
  poster_path?: string;
  release_date?: string;
  runtime?: string;
  vote_average?: string;
  overview?: string;
  genres?: [];
  credits?: any;
  cast?: [];

}
export interface Genre {
  name?: string;
}
export interface Actor {
  name?: string;
}
