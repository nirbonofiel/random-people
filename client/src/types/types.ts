export type TvShowData = {
    genres: string[];
    name:string;
    rating: Rating;
    summary: string;
    image:Image;
    id: number;
}

type Rating = {
    average: number;
}

type Image = {
    medium: string;
    original: string;
}