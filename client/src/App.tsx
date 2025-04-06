import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import FetchPage from './components/Pages/FetchPage';
import HistoryPage from './components/Pages/HistoryPage';



function App() {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: '10px', padding: '10px', justifyContent: 'center'}}>
        <Link to="/fetch">Fetch</Link>
        <Link to="/history">History</Link>
      </nav>

      <Routes>
        <Route path="/fetch" element={<FetchPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
