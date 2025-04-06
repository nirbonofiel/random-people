import { useEffect } from 'react';
import { fetchRandomPeoples } from '../../store/peoplesSlice';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import PersonList from '../People/PersonList';


const FetchPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { peoples, loading } = useSelector((state:RootState) => state.people);

  useEffect(() => {
    dispatch(fetchRandomPeoples());
  }, [dispatch]);

  return (
    <div>
      <h1>Random Peoples</h1>
      {loading && <p>Loading...</p>}
      {peoples && <PersonList peoples={peoples}/>}
    </div>
  );
}

export default FetchPage;