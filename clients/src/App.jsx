
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Start from './components/Start';
import Login from './pages/login';
import Regsiter from './pages/register';
import Home from './pages/Home';

function App() {
  return (
    <div className="bg-[#6e6cff]">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Regsiter />} />
          <Route exact path="/chats" element={<Home />} />
          <Route exact path="/" element={<Start />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;