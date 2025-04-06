import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import PersonList from "../People/PersonList";
import { useEffect } from "react";
import { fetchHistoryPeoples } from "../../store/peoplesSlice";

const HistoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { historyPeoples, loading  } = useSelector((state:RootState) => state.people);

  useEffect(() => {
    dispatch(fetchHistoryPeoples());
  }, [dispatch]);

  return (
    <div>
      <h1>History Peoples</h1>
      {loading && <p>Loading...</p>}
      {historyPeoples && <PersonList peoples={historyPeoples}/>}
    </div>
  );
}

export default HistoryPage;