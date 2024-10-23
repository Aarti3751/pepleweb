import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Components/Navigation';
import Sidebar from './Components/Sidebar';
import Overview from './Components/Overview';

import Addmember from './Components/Addmember';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Sidebar />}>
            <Route path="user" element={<Overview />} />
            <Route path="user/dashboard" element={<Addmember />} />
           
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
