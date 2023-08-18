import './App.css';
import History from './components/history-page';
import Home from './components/home-page';
import LoginPage from './components/login-page';
import {Routes , Route} from "react-router-dom";

function App() {
  return (
    <Routes>
          <Route path="history" element={<History />} />
          <Route path="home" element={<Home />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="home" element={<Home />} />
    </Routes>
  );
}

export default App;
