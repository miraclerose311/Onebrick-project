import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import custom page components
import About from '../pages/About';
import Beneficiaries from '../pages/Beneficiaries';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Buybrick from '../pages/Buybrick';
import Donors from '../pages/Donors';
import Landing from '../pages/Landing';
import Contact from '../pages/Contact';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<Landing />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/beneficiaries' element={<Beneficiaries />} />
          <Route path='/buybrick' element={<Buybrick />} />
          <Route path='/donors' element={<Donors />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
