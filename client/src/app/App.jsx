import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

// Import custom page components
import About from '../pages/About';
import Beneficiaries from '../pages/Beneficiaries';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Buybrick from '../pages/Buybrick';
import Donors from '../pages/Donors';
import Landing from '../pages/Landing';
import Contact from '../pages/Contact';
import Example from '../components/toast';

function App() {

  // const [user, setUser] = useState([]);
  // const [profile, setProfile] = useState([]);

  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => {
  //     console.log(codeResponse);
  //     setUser(codeResponse);
  //   },
  //   onError: (error) => console.log('Login Failed:', error),
  // });

  // useEffect(() => {
  //   if (user) {
  //     axios
  //       .get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user.access_token}`,
  //             Accept: 'application/json',
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         setProfile(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [user]);

  // // log out function to log the user out of google and set the profile array to null
  // const logOut = () => {
  //   googleLogout();
  //   setProfile(null);
  // };

  return (
    // <div>
    //   <h2>React Google Login</h2>
    //   <br />
    //   <br />
    //   {profile ? (
    //     <div>
    //       <img src={profile.picture} alt='user image' />
    //       <h3>User Logged in</h3>
    //       <p>Name: {profile.name}</p>
    //       <p>Email Address: {profile.email}</p>
    //       <br />
    //       <br />
    //       <button onClick={logOut}>Log out</button>
    //     </div>
    //   ) : (
    //     <button onClick={() => login()}>Sign in with Google 🚀 </button>
    //   )}
    // </div>
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
          <Route path='/toast' element={<Example />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
