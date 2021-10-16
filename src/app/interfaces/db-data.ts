import { Movie } from "./movie";

export interface DbData {
    average_rating: number,
    backdrop_path: string,
    comments: { movie: number,  },
    created_by: {gravatar_hash: string, id: string, name: string, username: string},
    description: string,
    id: number,
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    object_ids: {movie: number},
    page: number,
    poster_path: string,
    public: boolean,
    results: Movie[],
    revenue: number,
    runtime: number,
    sort_by: string,
    total_pages: number,
    total_results: number
}
