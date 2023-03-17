import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

import Router from './Router';
import Nav from './component/Nav';
import Footer from './component/Footer';

function App() {
  let location = useLocation()
  // let [isLogin, setIsLogin] = useState(false)
  let allPaths = ['/', '/about'] // kkeps track of all route in the app

  return (
    <div className='container mx-auto'>
      {/* {(location.pathname == '/login' || location.pathname == '/signup' || location.pathname == '*') ? <></> : <Nav />} */}
      {allPaths.includes(location.pathname) && <Nav />}
      <Router />
      {allPaths.includes(location.pathname) &&  <Footer />}
    </div>
  );
}

export default App;

// nav on error page check
