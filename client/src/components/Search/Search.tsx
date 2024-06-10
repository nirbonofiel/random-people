import  { useState } from 'react';
import { Button, TextField } from '@mui/material';
import React from 'react';

type SearchProps = {
    getShows: (search:string)=> void;
}

const Search: React.FC<SearchProps> = React.memo(({getShows}) => {

    const [search, setSearch] = useState('');

    const handleGetShows = () => {
        getShows(search);
        setSearch('');
    }

    const handleSetValue = (e: any) => {
        setSearch(e.target.value);
    }

    return (
        <div style={{marginTop:20}}>
             <TextField id="outlined-basic" variant="outlined" value={search} onChange={handleSetValue}/>
             <Button variant="outlined" color="primary" onClick={handleGetShows} style={{ height: '56px'}}>Search</Button>
        </div>
    );
 }); 

 export default Search;