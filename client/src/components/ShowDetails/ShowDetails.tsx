import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { TvShowData } from '../../types/types';

type ShowDetailsProps = {
    open: boolean;
    closeModal: (close: boolean) => void
    show?: TvShowData;
}

const ShowDetails: React.FC<ShowDetailsProps> = ({ open, closeModal, show }) => {


    if (!show) return null;
    const handleClose = () => closeModal(false);

    return (
        <Dialog
            open={open}
            onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">
                {show.name}
            </DialogTitle>
            <DialogContent>
                {show.rating &&
                    <Typography>
                        rating : {show.rating.average}
                    </Typography>
                }
                <Typography sx={{ mt: 2 }}>
                    {show.summary}
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default ShowDetails;