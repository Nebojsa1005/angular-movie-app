export interface Movie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: Array<number>,
    id: number,
    media_type: string,
    homepage: string,
    genres: {id: string, name: string}[],
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
    production_companies: any[],
    budget: number,
    revenue: number,
    tagline: string
}
