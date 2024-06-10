import React, { Dispatch, SetStateAction } from 'react';
import { Chip, Stack } from '@mui/material';
import { TvShowData } from '../../types/types';

type GenreProps = {
    genres?: string[];
    setFilteredTvShow: Dispatch<SetStateAction<TvShowData[]| undefined>>;
    tvShows?: TvShowData[];
}

const Genre: React.FC<GenreProps> = ({ genres,setFilteredTvShow,tvShows }) => {

    if (!genres) return null;

    const handleOnClick = (genre:string) => {   
        const filteredShows = tvShows?.filter(show=> show.genres.includes(genre)) || [];
        setFilteredTvShow(filteredShows);
    }

    return (
        <Stack direction="row" spacing={1} justifyContent='center' marginTop={10}>
            {genres.map((genre, index) => 
            <Chip key={index} label={genre} variant='outlined' onClick={()=> handleOnClick(genre)}/>
            )}
        </Stack>
    );
};

export default Genre;