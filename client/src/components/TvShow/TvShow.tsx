import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { TvShowData } from '../../types/types';

type TvShowProps = {
    tvShows?: TvShowData[];
    handleShowDetails: (show:TvShowData) => void
}

const TvShow: React.FC<TvShowProps> = ({ tvShows, handleShowDetails }) => {

    if (!tvShows) return null;

    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 20 }}>
            {
                tvShows.map(show => (<Card key={show.id} sx={{ maxWidth: 300 }}>
                    <CardMedia
                        component="img"
                        alt={show.name}
                        image={show.image && show.image.original}
                        height={280}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" className='card-title'>
                            {show.name}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Button size="small" onClick={()=>handleShowDetails(show)}>See More</Button>
                    </CardActions>
                </Card>))
            }
        </div>
    );
};

export default TvShow;