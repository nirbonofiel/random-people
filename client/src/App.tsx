import { useCallback, useState } from 'react';
import './App.css';
import { getTvShows } from './api/apiAction';
import Search from './components/Search/Search';
import Genre from './components/Genre/Genre';
import TvShow from './components/TvShow/TvShow';
import { TvShowData } from './types/types';
import ShowDetails from './components/ShowDetails/ShowDetails';
import { CircularProgress } from '@mui/material';



function App() {
  const [tvShows, setTvShows] = useState<TvShowData[]>();
  const [genres, setGenres] = useState<string[]>();
  const [tvShowsByGenres, setTvShowsByGenres] = useState<TvShowData[]>();
  const [showDetails, setShowDetails] = useState(false);
  const [currnetShow, setCurrentShow] = useState<TvShowData>();
  const [progress,setProgress] = useState(false);

  const handleShowDetails = useCallback((show: TvShowData) => {
    setCurrentShow(show);
    setShowDetails(true);
  },[]);


  const getShows = useCallback(async(search:string) => {
    setProgress(true);
    const result = await getTvShows(`/tvshow?q=${search}`);
    let genresMovie: string[] = [];
    if(result){
      setProgress(false);
      setTvShows(result.map((element:any) => element.show));
      genresMovie = Array.from(new Set (result.flatMap((element:any) => element.show.genres)));
      setGenres(genresMovie);
      setTvShowsByGenres([]);
    }
  },[]);

  return (
    <div className="App">
      <Search getShows={getShows}/>
      { progress && 
        <CircularProgress style={{marginTop:50}}/>
      }
      <Genre genres={genres} setFilteredTvShow={setTvShowsByGenres} tvShows={tvShows}/>
      <TvShow tvShows={tvShowsByGenres} handleShowDetails={handleShowDetails}/>
      {showDetails &&
        <ShowDetails open={showDetails} closeModal={setShowDetails} show={currnetShow}/>
      }
    </div>
  );
}

export default App;
