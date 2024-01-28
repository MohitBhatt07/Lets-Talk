
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Start from './components/Start';
import Login from './pages/login';
import Regsiter from './pages/register';
import Home from './pages/Home';

function App() {
  const styleName = "bg-orange-400 bg-[radial-gradient(at_46%_97%,rgb(168,162,158)_0,transparent_48%),radial-gradient(at_37%_16%,rgb(191,219,254)_0,transparent_66%),radial-gradient(at_29%_64%,rgb(251,113,133)_0,transparent_77%),radial-gradient(at_79%_43%,rgb(245,158,11)_0,transparent_56%),radial-gradient(at_67%_67%,rgb(236,252,203)_0,transparent_87%),radial-gradient(at_8%_33%,rgb(254,205,211)_0,transparent_79%)]";
  return (
    <div className={styleName}>
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