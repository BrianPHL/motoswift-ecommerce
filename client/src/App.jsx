import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router';
import { Header, Footer } from '@components';
import { Home } from '@pages';

const App = () => {

  const { pathname } = useLocation();
  const hideLayout = pathname === '/signin' || pathname === '/signup';

  return (
    <>
      { !hideLayout && <Header /> }
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/sign-in" element={ <SignIn /> } />
        <Route path="/sign-up" element={ <SignUp /> } />
        <Route path="/about-us" element={ <AboutUs /> } />
        <Route path="/motorcycles" element={ <Motorcycles /> } />
        <Route path="/parts-and-accessories" element={<PartsAndAccessories />} />
        <Route path="/reservation" element={ <Reservation /> } />
        <Route path="/cart" element={ <Cart /> } />
      </Routes>
      { !hideLayout && <Footer /> }
    </>
  );
};

export default App;
